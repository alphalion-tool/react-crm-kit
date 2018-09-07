/* @flow */

/* eslint-disable no-use-before-define */

import { EventEmitter } from 'fbemitter';
import { ParamError } from 'jscom/utils/error';

import type { ValidatorType, ValidatorItemType } from './helpers/validator';
import { validatorItemCheck, validatorCheck } from './helpers/validator';
import { cloneDeep } from 'jscom/utils/lodash';

export type SchemaItemType = {
    type: 'string' | 'number' | 'int' | 'object' | 'bool' | 'boolean',
    // 如果type为object时，ref则需要指定是哪一个
    ref?: any,
    convert?: (any, any, model: Schema) => any,
    defaultValue?: any,
    validator?: ValidatorType,
    required?: bool
};

export default class Schema extends EventEmitter {

    _fields: { [any]: SchemaItemType } = {};
    _properties: any = {};
    _raw: any = {};
    _changed: {
        form: bool,
        table: bool
    } = {
        form: false,
        table: false
    };
    _json: any = null;
    // 表单展示的数据
    _formData: any = null;
    // 表格展示的数据
    _tableData: any = null;

    constructor (obj: any, fields: { [any]: SchemaItemType }) {
        super();
        this._raw = Object.assign({}, obj);
        this._properties = {}; // clone just to be safe
        this._fields = fields;
        this.parse();
    }

    toJSON () {
        return cloneDeep(this._properties);
    }

    // 定义每个字段
    define (name: string, value: any) {

        const definition = this._fields[name];
        const { type, ref: Ref } = definition;
        if (type === 'object' && Ref) {
            if (!value) this._properties[name] = undefined;
            else this._properties[name] = new Ref(value);
        } else if (type === 'array' && Ref) {
            let tmpValue = value || [];
            this._properties[name] = tmpValue.map((tmpValueItem) => new Ref(tmpValueItem));
        } else {
            this._properties[name] = value;
        }

        Object.defineProperty(this, name, {
            get () { return this._properties[name] },
            set (newValue: any) {
                // ignore if value is unchanged
                // only works for primitives
                // console.log(name, newValue);
                if (newValue === this._properties[name]) return;

                const curDefinition = this._fields[name];
                const { type: curType, ref: CurRef } = curDefinition;
                if (curType === 'object' && CurRef) {
                    if (newValue) this._properties[name] = new CurRef(newValue);
                    else this._properties[name] = undefined;
                } else if (curType === 'array' && CurRef) {
                    let tmpValue = newValue || [];
                    this._properties[name] = tmpValue.map((tmpValueItem) => new CurRef(tmpValueItem));
                } else {
                    this._properties[name] = newValue;
                }
                this._changed.form = true;
                this._changed.table = true;

                // this.emit(name, newValue, oldValue, name);
                return;
            },
            enumerable: true
        })
    }

    // 解析数据
    parse () {
        Object.keys(this._fields).forEach((name) => {
            const { type, convert, defaultValue } = this._fields[name];
            let value = this._raw[name];
            if (name in this._raw) {
                if (convert) value = convert(value, this._raw, this);
            } else {
                value = convert ? convert(defaultValue, this._raw, this) : defaultValue;
            }
            this.define(name, value);
        });
    }

    // 验证每一项
    validateItem (name: string, value: any, tipFlag?: bool): { checked: bool, validator?: ValidatorItemType } | bool {
        if (!(name in this._fields)) return true;
        const validator = this._fields[name].validator;
        if (validator === undefined) return true;
        return validatorCheck(validator, value, tipFlag);
    }


    // 验证
    validate (obj: any) {
        return !Object.keys(this._fields).some((key) => {
            const item = this._fields[key];
            return item.validator && !this.validateItem(key, obj[key]);
        });
    }

    // 同步设置
    setSync (name: string, value: any): { checked: bool, validator?: ValidatorItemType } {
        const model = this;
        const ret = this.validateItem(name, value, true);
        if (typeof ret === 'object') {
            if (ret.checked) {
                model[name] = value;
            }
            return ret;
        }
        return { checked: true };
    }

    // 设置，返回Promise对象
    set (name: string, value: any) {
        const model = this;
        return new Promise((resolve, reject) => {
            const ret = model.setSync(name, value);
            if (typeof ret === 'object') {
                if (ret.checked) {
                    // 校验成功
                    return resolve(model);
                } else {
                    return reject(new ParamError(`${name} error`), { [`${name}`]: ret.validator ? ret.validator.desc : 'error' });
                }
            } else {
                return reject(new Error(`${name} error`));
            }
        });
    }

    // 设置所有
    setAll (params: any) {
        const model = this;
        return new Promise((resolve, reject) => {
            if (Object.prototype.toString(params) !== '[object Object]') {
                return reject(new Error('params must be object type'));
            }
            if (params === null) {
                return resolve(model);
            }

            const keys = Object.keys(params);
            for (let i = 0, len = keys.length; i < len; i++) {
                const name = keys[i],
                    ret = model.setSync(name, params[name]);
                if (typeof ret === 'object') {
                    if (!ret.checked) {
                        return reject(new ParamError(`${name} error`, { [`${name}`]: ret.validator ? ret.validator.desc : 'error' }));
                    }
                }
            }

            return resolve(model);
        });
    }

    // 是否是已经改变了数据
    isChanged (key: string) {
        return this._changed[key];
    }

    setChanged (key: string, flag: bool) {
        this._changed[key] = flag;
    }

    toString () {
        const strObj = {
            ...this._properties,
            __model__: true
        };
        return `${JSON.stringify(strObj)}`;
    }


    // 展示form表单时候用到
    toForm () {
        if (this.isChanged('form') || !this._formData) {
            const newData = { ...this.toJSON() };
            this._formData = newData;
            this.setChanged('form', false);
        }
        return this._formData;
    }

    // 展示table会用到的
    toTable () {
        if (this.isChanged('table') || !this._tableData) {
            const newData = { ...this.toJSON() };
            this._tableData = newData;
            this.setChanged('table', false);
        }
        return this._tableData;
    }

    toAPI () {
        return {
            ...this.toJSON()
        }
    }

}