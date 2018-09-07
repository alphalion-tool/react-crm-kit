/**
 * @module  actions/app
 * @description 全局会用到的Action
 */

import { createActions, getActionIds } from 'jscom/store/redux-tool';

const actions = createActions({

    /**
     * @memberOf module:actions/app
     * @description 切换语言
     * @param  {string} lang 语言类型
     */
    switchLang: (lang) => ({
        lang
    })

}, 'APP');

// 用于充值APP数据
actions.RESETAPP = { type: 'RESETAPP', payload: {} };

export const actionIds = getActionIds(actions);

export default actions;