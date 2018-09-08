'use strict';

import services from 'jscom/services';
import { createActions, getActionIds } from 'jscom/store/redux-tool';

const actions = createActions({

    summaryBasic: (params) => {
        return {
            promise: services.summaryBasic(),
        }
    },

    summaryVolume: (params) => {
        return {
            promise: services.summaryVolume(params),
        }
    },

    summaryWithdraw: (params) => {
        return {
            promise: services.summaryWithdraw(params)
        }
    }

}, 'Dashboard');

export const actionIds = getActionIds(actions);

export default actions;