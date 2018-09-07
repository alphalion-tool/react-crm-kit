/* @flow */

import Schema from './Schema';

export default class UserSchema extends Schema {

    static fields = {
        id: { type: 'string', convert: (value, item) => item.userId },
        userId: { type: 'int', rules: [{ type: 'integer' }] },
        userName: { type: 'string', rules: [{ required: true, type: 'string', min: 3, max: 15, message: 'between 3~15 letters' }] },
        email: { type: 'string', rules: [{ required: true, type: 'string', min: 4, max: 100, message: 'You have not input completely' }, { type: 'email' }] },
        firstName: { type: 'string', rules: [{ required: true, type: 'string', min: 1, max: 100 }] },
        lastName: { type: 'string', rules: [{ required: true, type: 'string', min: 1, max: 100 }] },
        description: { type: 'string', rules: [{ type: 'string', max: 100 }] },
        password: { type: 'string', rules: [{ type: 'string' }] },
        phone: { type: 'string', rules: [{ required: true, type: 'string' }] },
    };

    // 从API构建数据
    static fromAPI (apiParams: any) {
        const params = apiParams || {};
        return new UserSchema({
            ...params,
        });
    }

    constructor (props: any) {
        super(props, UserSchema.fields);
    }

    toTable () {
        if (this.isChanged('table') || !this._tableData) {
            const newData = { ...this.toJSON() };
            newData.correspondentId = newData.correspondent.correspondentId;
            newData.correspondentName = newData.correspondent.correspondentName;
            newData.roleId = newData.role.roleId;
            newData.roleName = newData.role.roleName;
            newData.companyId = newData.company.companyId;
            newData.companyName = newData.company.companyName;
            this._tableData = newData;
            this.setChanged('table', false);
        }
        return this._tableData;
    }

    toAPI () {
        const json = {
            ...this.toJSON(),
        };
        return json;
    }

}