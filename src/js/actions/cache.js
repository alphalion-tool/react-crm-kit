/**
 * @module  actions/cache
 * @description 全局会用到的数据Action
 */

import { createActions, getActionIds } from 'jscom/store/redux-tool';

import services from 'jscom/services';

const actions = createActions({

    loadUsers: (params) => {
        return {
            promise: services.queryUserInfo(params),
        };
    },

}, 'CACHE');

export const actionIds = getActionIds(actions);

export default actions;

