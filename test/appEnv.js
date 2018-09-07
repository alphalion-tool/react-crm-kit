/* eslint-disable new-cap */

import AppActions from 'jscom/actions/app';
import { currency2Options, country2Options } from 'jscom/reducers/app';

import { IMap, IList } from 'jscom/utils/immutable';

import { assign, omit } from 'jscom/utils/lodash';
import { str2moment, moment2str, todayStr } from 'jscom/utils/time';
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

const currencyRet = readJson('const/currency.json');
const countryRet = readJson('const/country.json');
const permissionRet = readJson('.json');

const currency = currencyRet.data,
    country = countryRet.data,
    permission = permissionRet.data.permission;


// 用于重置测试环境的全局变量
global.window.TEST_RESET_ENV = function () {
    processAppEnv(permissionRet.data);
    window.__DATA__.CURRENCY = currency;
    window.__DATA__.CURRENCY_OPTIONS = currency2Options(currency);
    window.__DATA__.COUNTRY = country;
    window.__DATA__.COUNTRY_OPTIONS = country2Options(country);

    window.__DATA__.PERMISSION = permission;
    window.__DATA__.TODAY = todayStr('MM/DD/YYYY');
}

window.TEST_RESET_ENV();

const store = mockStore({
    app: {
        ...appState,
        CURRENCY: new IList(currency),
        COUNTRY: new IList(country),
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
        authName: 'admin',
        isLoggedIn: true,
    },
    ...getCacheStore(),
});
store.asyncReducers = {};
window.__TEST__.STORE = store;
