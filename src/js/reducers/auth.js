/**
 * @module reducers/auth
 * @description 登录Action对应的reducer，action文件为`jscom/actions/auth.js`
 */

'use strict';

import { createReducers } from 'jscom/store/redux-tool';
import { actionIds } from '../actions/auth';

export const initialState = {
    userName: localStorage.getItem('userName') || '',
    authToken: null,
    isLoggedIn: false,
    status: null,
};

export default createReducers(initialState, {

    [`${actionIds.switchAuth}`]: (state, { isLoggedIn, userName, user }) => ({
        ...state,
        isLoggedIn,
        userName
    }),

    [`${actionIds.login}`]: (state, { name, token }) => ({
        ...state,
        userName: name,
        authToken: token,
        isLoggedIn: false,
        status: 'loading',
    }),

    [`${actionIds.login}-success`]: (state, { body, name }) => {
        const user = body.data;
        const userName = user.userName;
        localStorage.setItem('userName', userName);
        return {
            ...state,
            isLoggedIn: true,
            userName,
            status: 'done'
        };
    },

    [`${actionIds.login}-failure`]: (state, { error }) => {
        return {
            ...state,
            isLoggedIn: false,
            status: null
        };
    },

    [`${actionIds.logout}-success`]: (state) => ({
        ...state,
        userName: '',
        authToken: null,
        isLoggedIn: false,
        status: null,
    })

});
