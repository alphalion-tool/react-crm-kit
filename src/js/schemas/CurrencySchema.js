/* @flow */

import Schema from './Schema';
import type { SchemaItemType } from './Schema';

export default class CurrencySchema extends Schema {

    static fields: { [any]: SchemaItemType } = {
        id: { type: 'string' },
        currency: { type: 'string' },
        isoCode: { type: 'string' },
        country: { type: 'string' }
    };

    // 从API构建数据
    static fromAPI (params: any = {}) {
        return new CurrencySchema({
            ...params,
            isoCode: params.isoCode
        });
    }

    static currency2Option (currency = {}) {
        return {
            label: `${currency.isoCode} ${currency.currency} ${currency.country}`,
            key: currency.isoCode,
            value: currency.isoCode
        };
    }

    constructor (props: any) {
        super(props, CurrencySchema.fields);
    }

}