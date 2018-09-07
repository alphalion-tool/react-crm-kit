/* eslint-disable max-len */

import { actionIds } from '../action';
import reducer from '../reducer';
import { readJson } from 'jstest/data/config';
import { getUserQuery } from 'jstest/helpers/store';

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
        const body = readJson('user/query.json');
        const reducerRet = reducer(undefined, { type: `${actionIds.search}-success`, payload: { body } });
        expect(reducerRet).toEqual(jasmine.objectContaining({
            status: 'done'
        }))
        expect(reducerRet.userList.length).toEqual(8);
        expect(reducerRet.userList).toEqual(getUserQuery());
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