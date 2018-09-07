/* eslint-disable max-len, no-multi-str */

import {
    columns
} from '../table';

describe('UserList/config/table', () => {

    it('columns', () => {
        expect(columns.length).toEqual(10);
        const expectedStr = '';
        expect(JSON.stringify(columns)).toEqual(expectedStr);
    });
});