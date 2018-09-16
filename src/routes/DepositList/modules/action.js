'use strict';

import services from 'jscom/services';
import { createActions, getActionIds } from 'jscom/store/redux-tool';

const actions = createActions({

    search: (params) => {
        return {
            promise: services.depositQuery(params)
        }
    }

}, 'DepositsList');

export const actionIds = getActionIds(actions);

export default actions;