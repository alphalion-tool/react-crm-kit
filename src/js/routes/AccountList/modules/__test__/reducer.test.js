/* eslint-disable max-len */

import { actionIds } from '../action';
import reducer from '../reducer';
import { readJson } from 'jstest/data/config';
import { getAccountQuery } from 'jstest/helpers/store';
import { processTableData } from '../../config/table';

describe('AccountList/modules/reducer', () => {

    // query loading
    it('search - loading', () => {
        expect(reducer(undefined, {
            type: actionIds.search
        })).toEqual({
            accountList: [],
            status: 'loading',
        });
    });

    // query success
    it('search - success', () => {
        const body = readJson('account/list.json');
        const reducerRet = reducer(undefined, { type: `${actionIds.search}-success`, payload: { body } });
        expect(reducerRet).toEqual(jasmine.objectContaining({
            status: 'done'
        }))
        expect(reducerRet.accountList.length).toEqual(3);
        expect(reducerRet.accountList).toEqual(processTableData(getAccountQuery()));
    });

    // query failed
    it('search - failed', () => {
        expect(reducer(undefined, {
            type: `${actionIds.search}-failure`
        })).toEqual({
            accountList: [],
            status: 'failure'
        });
    });

});