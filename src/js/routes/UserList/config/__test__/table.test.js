/* eslint-disable max-len, no-multi-str */

import {
    getTableToolConfig,
    columns
} from '../table';

describe('UserList/config/table', () => {

    it('columns', () => {
        expect(columns.length).toEqual(10);
        const expectedStr = '[{"label":"User ID","key":"userId","width":130,"fixed":true,"cellClassName":"cell--link","sort":{"type":"number"},"filter":{"type":"number"}},{"label":"User Name","key":"userName","width":130,"fixed":true,"cellClassName":"cell--link","sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"Email","key":"email","width":150,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"First Name","key":"firstName","width":130,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"Last Name","key":"lastName","width":130,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"Role","key":"roleName","width":130,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"Correspondent","key":"correspondentName","width":130,"cellClassName":"cell--link","sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"Company","key":"companyName","width":130,"cellClassName":"cell--link","sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"Phone","key":"phone","width":130,"sort":{"type":"alphabet"},"filter":{"type":"string"}},{"label":"Description","key":"description","width":200,"sort":{"type":"alphabet"},"filter":{"type":"string"}}]';
        expect(JSON.stringify(columns)).toEqual(expectedStr);
    });

    it('getTableToolConfig - no add, query permission', () => {
        const fakeProps = {
            checkPermission: jasmine.createSpy('checkPermission').and.returnValue(false)
        };
        const tools = getTableToolConfig(fakeProps);
        expect(tools.length).toEqual(2);
    });

    it('getTableToolConfig - has add, query permission', () => {
        const fakeProps = {
            checkPermission: jasmine.createSpy('checkPermission').and.returnValue(true)
        };
        const tools = getTableToolConfig(fakeProps);
        expect(tools.length).toEqual(3);
    });
});