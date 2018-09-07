/**
 * @module reducers/auth
 * @description 登录Action对应的reducer，action文件为`jscom/actions/auth.js`
 */

'use strict';

import { createReducers } from 'jscom/store/redux-tool';
import { actionIds } from '../actions/auth';

export const initialState = {
    authName: localStorage.getItem('authName') || '',
    authToken: null,
    isLoggedIn: false,
    authMsg: null,
    status: null,
};

export default createReducers(initialState, {

    [`${actionIds.switchAuth}`]: (state, { isLoggedIn, authName, user }) => ({
        ...state,
        isLoggedIn,
        authName
    }),

    [`${actionIds.login}`]: (state, { name, token }) => ({
        ...state,
        authName: name,
        authToken: token,
        isLoggedIn: false,
        authMsg: null,
        status: 'loading',
    }),

    [`${actionIds.login}-success`]: (state, { body, name }) => {
        const res = body;

        const userName = res.user && res.user.userName;

        localStorage.setItem('authName', userName);
        return {
            ...state,
            isLoggedIn: true,
            authName: userName,
            authMsg: null,
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
        authName: '',
        authToken: null,
        isLoggedIn: false,
        status: null,
    })

});
