/* eslint-disable max-len, no-multi-str */

import {
    columns
} from '../table';

describe('AccountList/config/table', () => {

    it('columns', () => {
        expect(columns.length).toEqual(10);
        const expectedStr = '[{"title":"ACC ID","key":"accountId","dataIndex":"accountId","width":130},{"title":"ACC Name","key":"accountName","dataIndex":"accountName","width":130},{"title":"ID Type","key":"idType","dataIndex":"idType","width":130},{"title":"ID Number","key":"idNumber","dataIndex":"idNumber","width":130},{"title":"Level","key":"level","dataIndex":"level","width":130},{"title":"Email","key":"email","dataIndex":"email","width":150},{"title":"First Name","key":"firstName","dataIndex":"firstName","width":130},{"title":"Last Name","key":"lastName","dataIndex":"lastName","width":130},{"title":"Phone","key":"phone","dataIndex":"phone","width":130},{"title":"Country","key":"country","dataIndex":"country","width":130}]';
        expect(JSON.stringify(columns)).toEqual(expectedStr);
    });
});