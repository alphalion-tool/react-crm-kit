/* @flow */


import Schema from './Schema';
import type { SchemaItemType } from './Schema';

export default class CountrySchema extends Schema {

    static fields: { [any]: SchemaItemType } = {
        id: { type: 'string' },
        code: { type: 'string', validator: { type: 'length', min: 1, max: 200, desc: '长度在2-200之间' } },
        enUS: { type: 'string' },
        zhCn: { type: 'string' }
    };

    // 从API构建数据
    static fromAPI (params) {
        return new CountrySchema({
            ...params,
            code: params.code,
            enUS: params.enUs,
            zhCn: params.zhCn
        });
    }

    static country2Option (country = {}) {
        return {
            label: country.enUs,
            key: country.code,
            value: country.code,
        };
    }

    constructor (props: any) {
        super(props, CountrySchema.fields);
    }

}