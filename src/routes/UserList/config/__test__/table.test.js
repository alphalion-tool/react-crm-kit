/* eslint-disable max-len, no-multi-str */

import {
    // getTableToolConfig,
    columns
} from '../table';

describe('UserList/config/table', () => {

    it('columns', () => {
        expect(columns.length).toEqual(6);
        const expectedStr = '[{"title":"User ID","key":"userId","dataIndex":"userId","width":130,"sort":{"type":"number"},"filter":{"type":"number"}},{"title":"User Name","key":"userName","dataIndex":"userName","width":130},{"title":"Email","key":"email","dataIndex":"email","width":150,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"title":"First Name","key":"firstName","dataIndex":"firstName","width":130,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"title":"Last Name","key":"lastName","dataIndex":"lastName","width":130,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"title":"Phone","key":"phone","dataIndex":"phone","width":130,"sort":{"type":"alphabet"},"filter":{"type":"string"}}]';
        expect(JSON.stringify(columns)).toEqual(expectedStr);
    });

    // it('getTableToolConfig - no add, query permission', () => {
    //     const fakeProps = {
    //         checkPermission: jasmine.createSpy('checkPermission').and.returnValue(false)
    //     };
    //     const tools = getTableToolConfig(fakeProps);
    //     expect(tools.length).toEqual(2);
    // });

    // it('getTableToolConfig - has add, query permission', () => {
    //     const fakeProps = {
    //         checkPermission: jasmine.createSpy('checkPermission').and.returnValue(true)
    //     };
    //     const tools = getTableToolConfig(fakeProps);
    //     expect(tools.length).toEqual(3);
    // });
});