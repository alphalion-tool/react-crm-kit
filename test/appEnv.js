/* eslint-disable new-cap */

import AppActions from 'jscom/actions/app';
import { processAppEnv } from 'jscom/utils/env';

import { switchLocale } from 'appcom/locales/index';
import locationReducer from 'jscom/store/location';
import mockStore from 'jstest/helpers/store';

import { initialState as appState } from 'jscom/reducers/app';
import { initialState as authState } from 'jscom/reducers/auth';
import { readJson } from 'jstest/data/config';
import { getCacheStore } from 'jstest/helpers/cache';

switchLocale();
global.window.localeMessages = window.localeMessages;
window.__DATA__ = window.__DATA__ || {};
window.__TEST__ = window.__TEST__ || {}; // 用于测试


const permissionRet = readJson('.json');

const permission = permissionRet.data.user.permission;

// 用于重置测试环境的全局变量
global.window.TEST_RESET_ENV = function () {
    processAppEnv(permissionRet.data);
    window.__DATA__.CURRENCY = []; 
    window.__DATA__.CURRENCY_OPTIONS = [];
    window.__DATA__.COUNTRY = [];
    window.__DATA__.COUNTRY_OPTIONS = [];

    window.__DATA__.PERMISSION = permission;
}

window.TEST_RESET_ENV();

const store = mockStore({
    app: {
        ...appState,
        CURRENCY: [], // new IList(currency),
        COUNTRY: [], // new IList(country),
        permission: window.__DATA__.PERMISSION,
        preloadFlag: true,
        user: { 
            userName: 'bitbaluser',
            userId: 34,
            email: 'bitbal@bitbal.pro',
            phone: null,
            firstName: 'bit',
            lastName: 'bal',
            description: null,
        }
    },
    auth: {
        ...authState,
        userName: 'admin',
        isLoggedIn: true,
    },
    ...getCacheStore(),
});
store.asyncReducers = {};
window.__TEST__.STORE = store;
