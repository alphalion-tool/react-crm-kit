/* eslint-disable max-len */

import { actionIds } from '../action';
import reducer from '../reducer';
import { readJson } from 'jstest/data/config';
import { getUserQuery } from 'jstest/helpers/store';
import { processTableData } from '../../config/table';

describe('UserList/modules/reducer', () => {

    // query loading
    it('search - loading', () => {
        expect(reducer(undefined, {
            type: actionIds.search
        })).toEqual({
            userList: [],
            status: 'loading',
        });
    });

    // query success
    it('search - success', () => {
        const body = readJson('user/list.json');
        const reducerRet = reducer(undefined, { type: `${actionIds.search}-success`, payload: { body } });
        expect(reducerRet).toEqual(jasmine.objectContaining({
            status: 'done'
        }))
        expect(reducerRet.userList.length).toEqual(3);
        expect(reducerRet.userList).toEqual(processTableData(getUserQuery()));
    });

    // query failed
    it('search - failed', () => {
        expect(reducer(undefined, {
            type: `${actionIds.search}-failure`
        })).toEqual({
            userList: [],
            status: 'failure'
        });
    });

});