'use strict';

import services from 'jscom/services';
import { createActions, getActionIds } from 'jscom/store/redux-tool';

const actions = createActions({

    search: (params) => {
        return {
            promise: services.accountQuery(params)
        }
    }

}, 'AccountList');

export const actionIds = getActionIds(actions);

export default actions;