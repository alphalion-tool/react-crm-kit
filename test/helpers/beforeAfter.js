/* 自定义before, after，用于全局使用 */

import AppActions from 'jscom/actions/app';
import { currency2Options, country2Options } from 'jscom/reducers/app';
import { IMap, IList } from 'jscom/utils/immutable';
import { assign, omit } from 'jscom/utils/lodash';
import { str2moment, moment2str, todayStr } from 'jscom/utils/time';

import { switchLocale } from 'jscom/assets/locales/index';
import locationReducer from 'jscom/store/location';
import mockStore from 'jstest/helpers/store';

import { initialState as appState } from 'jscom/reducers/app';
import { initialState as authState } from 'jscom/reducers/auth';

/* 自定义 */
export function customBeforeAll (cb) {
    beforeAll((done) => {
        cb ? cb(done) : done();
    })
}

/* 预加载数据 */
export function preloadBeforeAll (cb) {

    customBeforeAll((done) => {
        cb ? cb(done) : done();
    });
    
}

/* 多语言预处理 */
export function localeBeforeAll (cb) {
    customBeforeAll((done) => {
        switchLocale();
        global.window.localeMessages = window.localeMessages;
        cb ? cb(done) : done();
    })
}