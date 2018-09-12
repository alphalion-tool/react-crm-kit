/**
 * @module reducers/app
 * @description 全局Action对应的reducer处理函数，对应的action文件为`jscom/actions/app.js`
 */

'use script';

import Cookie from 'react-cookie';
import { IMap, IList } from 'jscom/utils/immutable';
import { createReducers } from 'jscom/store/redux-tool';
import { switchLocale } from 'appcom/locales/index';
import { actionIds as Actions } from '../actions/app';
import { actionIds as authActions } from '../actions/auth';
import { processAppEnv } from 'jscom/utils/env';
import CurrencySchema from 'jscom/schemas/CurrencySchema';
import CountrySchema from 'jscom/schemas/CountrySchema';

window.__DATA__ = window.__DATA__ || {};
window.__data = window.__data || {};

export function currency2Options (currs) {
    return currs.map((item) => CurrencySchema.currency2Option(item));
}

export function country2Options (countries) {
    return countries.map((item) => CountrySchema.country2Option(item));
}

const initialLang = switchLocale(Cookie.load('lang') || navigator.language || navigator.browserLanguage);

export const initialState = {
    winWidth: 0,
    winHeight: 0,
    resizeTime: 0,
    locales: {
        lang: initialLang.locale,
        messages: initialLang.messages,
        formats: initialLang.formats
    },
    CURRENCY: new IList([]),  // currency global
    COUNTRY: new IList([]),  // country global
    permission: window.__data.permission || {},
    user: window.__data.user || {}
};

export default createReducers(initialState, {

    // 切换语言
    [`${Actions.switchLang}`]: (state, { lang }) => {
        const language = switchLocale(lang);
        Cookie.save('lang', language.locale, { path: '/' });
        return {
            ...state,
            locales: {
                lang: language.locale,
                messages: language.messages,
                formats: language.formats,
            }
        };
    },

    // login success，这里取得permisson
    [`${authActions.login}-success`]: (state, { body }) => {
        const user = body.data;
        const permission = user.permission;
        // 登录成功，这里进行环境初始化
        processAppEnv({ user, permission, isLoggedIn: true });

        return {
            ...state,
            permission,
            user
        };
    },

    // logout success，重置一些信息
    [`${authActions.logout}-success`]: (state) => {
        processAppEnv({ isLoggedIn: false });
        return {
            ...state,
            CURRENCY: new IList([]),  // currency global
            COUNTRY: new IList([]),  // country global
            permission: {},
            user: {}
        };
    },

    [`${authActions.switchAuth}`]: (state, { user, ...others }) => {

        processAppEnv({
            user,
            permission: user ? user.permission : {},
            ...others
        });

        return {
            ...state,
            user,
            permission: window.__DATA__.PERMISSION,
        };
    }

});