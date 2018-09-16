/* @flow */
/* eslint-disable */

// 字符串长度validator
type ValidateLen = {
    type: 'length',
    min?: number,
    max?: number,
    // 针对当前错误项的描述
    desc?: string
};

// 整数校验validator
type ValidateInt = {
    type: 'int',
    min?: number,
    max?: number,
    // 针对当前错误项的描述
    desc?: string
};

// 数字大小validator
type ValidateNumber = {
    type: 'number',
    min?: number,
    max?: number,
    // 针对当前错误项的描述
    desc?: string
};

// 包含validator
type ValidateInclusion = {
    type: 'inclusion',
    list: Array<any>,
    // 针对当前错误项的描述
    desc?: string
};

// 不包含validator
type ValidateExclusion = {
    type: 'exclusion',
    list: Array<any>,
    // 针对当前错误项的描述
    desc?: string
};

// 格式，正则校验validator
type ValidateRegExp = {
    type: 'regexp',
    pattern: typeof RegExp,
    // 针对当前错误项的描述
    desc?: string
};

// 日期校验validator
type ValidateDate = {
    type: 'date',
    format: 'YYYY-MM-DD',
    // 针对当前错误项的描述
    desc?: string
};

// email校验validator
type ValidateEmail = {
    type: 'email',
    // 针对当前错误项的描述
    desc?: string
};

// name校验validator
type ValidateName = {
    type: 'name',
    desc?: string
};

// 必须有值
type ValidateRequired = {
    type: 'required',
    desc?: string
};

// 自定义校验函数
type ValidateFunc = {
    type: 'func',
    func: (value: any) => bool,
    desc?: string
};

export const defaultRequiredValidator = {
    type: 'required',
    desc: 'Not Empty'
};


export type ValidatorItemType = ValidateLen
    | ValidateInt | ValidateNumber | ValidateInclusion | ValidateExclusion
    | ValidateRegExp | ValidateDate | ValidateEmail | ValidateName | ValidateFunc | ValidateRequired;
    
export type ValidatorType = Array<ValidatorItemType> | ValidatorItemType;

// validator的每一项校验
export function validatorItemCheck (validatorItem: any, value: any) {
    if (validatorItem === null || validatorItem === undefined) return true;
    if (value === null || value === undefined) return false;

    const { type, min, max, list, pattern, format, func, required } = validatorItem;
    switch (type) {
        case 'number':
        case 'int':
            if (min !== undefined && min > value) return false;
            if (max !== undefined && max < value) return false;
            return true;
        case 'length':
            if (value.length === undefined) return false;
            if (min !== undefined && min > value.length) return false;
            if (max !== undefined && max < value.length) return false;
            return true;
        case 'inclusion':
            if (list.indexOf(value) === -1) return false;
            return true;
        case 'exclusion':
            if (list.indexOf(value) !== -1) return false;
            return true;
        case 'regexp':
            return pattern.test(value);
        case 'date':
            // 待处理
            return true;
        case 'email':
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        case 'name':
            if (min !== undefined && min > value.length) return false;
            if (max !== undefined && max < value.length) return false;
            if (min === undefined && max === undefined) {
                if (value.length > 0 && value.length < 200) return true;
            }
            return false;
        case 'required':
            if (value === null || value === undefined || value === '') return false;
            return true;
        case 'func':
            return func(value);
        default:
            return true;
    }
}


// validator的校验，最后一个参数表示的是，是否返回当前错误的描述
export function validatorCheck (validator?: ValidatorType, value: any, detailFlag?: bool): { checked: bool, validator?: ValidatorItemType } | bool {
    if (!validator) {
        return detailFlag ? { checked: true } : true;
    }
    if (Array.isArray(validator)) {
        // 拥有多条判断的规则，此时一条一条判断
        for (let i = 0, len = validator.length; i < len; i++) {
            const item = validator[i];
            if (!validatorItemCheck(item, value)) {
                return detailFlag ? { checked: false, validator: item } : false;
            }
        }
        
    } else {
        // 仅一条规则
        if (!validatorItemCheck(validator, value)) {
            return detailFlag ? { checked: false, validator } : false;
        }
    }

    return detailFlag ? { checked: true } : true;
}