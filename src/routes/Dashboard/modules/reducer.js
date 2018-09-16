'use strict';

import { createReducers } from 'jscom/store/redux-tool';
import { actionIds } from './action';
import { processWithdrawList } from '../config/table';

const initialStateDefault = {

    withdrawList: [],
    dailyUSDTVolumeList: [],
    userCountList: [],

    dailyWithdraw: 0,
    dailyDeposit: 0,
    weeklyWithdrawList: [],
    weeklyDepositList: [],

    dailyVolumeList: [],
    weeklyVolumeList: [],

    basicStatus: '',
    volumeStatus: '',
    withdrawStatus: ''

};

export function reducerFactory (initialState = initialStateDefault) {

    return createReducers(initialState, {

        [`${actionIds.summaryBasic}`]: (state, { value }) => ({
            ...state,
            basicStatus: 'loading',
        }),

        [`${actionIds.summaryBasic}-success`]: (state, { body, ...props }) => {
            const ret = body.data;
            return {
                ...state,
                basicStatus: 'done',
                userCountList: ret.users,
                withdrawList: processWithdrawList(ret.withdraws),
                dailyUSDTVolumeList: ret.volumes
            };
        },

        [`${actionIds.summaryBasic}-failure`]: (state, { value }) => ({
            ...state,
            basicStatus: 'failure'
        }),

        [`${actionIds.summaryVolume}`]: (state, { value }) => ({
            ...state,
            volumeStatus: 'loading',
        }),

        [`${actionIds.summaryVolume}-success`]: (state, { body, ...props }) => {
            const ret = body.data;
            return {
                ...state,
                dailyVolumeList: ret.daily,
                weeklyVolumeList: ret.weekly,
                volumeStatus: 'done',
            };
        },

        [`${actionIds.summaryVolume}-failure`]: (state, { value }) => ({
            ...state,
            volumeStatus: 'failure'
        }),

        [`${actionIds.summaryWithdraw}`]: (state, { value }) => ({
            ...state,
            withdrawStatus: 'loading',
        }),

        [`${actionIds.summaryWithdraw}-success`]: (state, { body, ...props }) => {
            const ret = body.data;
            return {
                ...state,
                withdrawStatus: 'done',
                dailyWithdraw: ret.withdraw,
                dailyDeposit: ret.deposit,
                weeklyWithdrawList: ret.withdraws,
                weeklyDepositList: ret.deposits,
            };
        },

        [`${actionIds.summaryWithdraw}-failure`]: (state, { value }) => ({
            ...state,
            withdrawStatus: 'failure'
        })

    })
}

export default reducerFactory();