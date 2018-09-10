'use strict';

import { createReducers } from 'jscom/store/redux-tool';
import { actionIds } from './action';
import { processTableData } from '../config/table';

const initialStateDefault = {
    status: '', // 状态
    depositList: [],
};

export function reducerFactory (initialState = initialStateDefault) {

    return createReducers(initialState, {

        [`${actionIds.search}`]: (state, { value }) => ({
            ...state,
            status: 'loading',
        }),

        [`${actionIds.search}-success`]: (state, { body, ...props }) => {
            const serviceData = body.data ? body.data.data : [];
            return {
                ...state,
                status: 'done',
                depositList: processTableData(serviceData),
            };
        },

        [`${actionIds.search}-failure`]: (state, { value }) => ({
            ...state,
            status: 'failure'
        })

    })
}

export default reducerFactory();