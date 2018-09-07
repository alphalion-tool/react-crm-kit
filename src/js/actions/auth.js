/**
 * @module actions/auth
 * @description 登录相关的Action
 */

import { createActions, getActionIds } from 'jscom/store/redux-tool';
import services from 'jscom/services';

const actions = createActions({

    /**
     * @memberOf module:actions/auth
     * @description 登录Action
     * @param  {String} name 用户名
     * @param  {String} pswd 密码
     */
    login: ( name, pswd ) => ({
        name,
        promise: services.authLogin({ name, pswd }),
        // SHOW_ERR_TIP: false,
    }),

    /**
     * @memberOf module:actions/auth
     * @description 退出Action
     */
    logout: () => ({
        name: null,
        promise: services.authLogoutPost()
    }),

    /**
     * @memberOf module:actions/auth
     * @description 切换登录与否的状态
     * @param  {Boolean} isLoggedIn  是否是登录
     */
    switchAuth: ({ isLoggedIn, user, ...others }) => ({
        isLoggedIn,
        authName: user && user.userName ? user.userName : '',
        user,
        ...others
    })

}, 'AUTH');

export const actionIds = getActionIds(actions);

export default actions;