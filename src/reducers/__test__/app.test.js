/* eslint-disable new-cap */

import { readJson } from 'jstest/data/config';
import { IMap, IList } from 'jscom/utils/immutable';
import reducer, { initialState, currency2Options, country2Options } from 'jscom/reducers/app';
import appActions, { actionIds as appActionIds } from 'jscom/actions/app';
import authActions, { actionIds as authActionIds } from 'jscom/actions/auth';
import { switchLocale } from 'jscom/assets/locales/index';

describe('reducer/app', () => {
    
    afterEach(() => {
        window.TEST_RESET_ENV();
    })

    it('switchLang', () => {
        const lng = switchLocale('zh');
        expect(reducer(undefined, {
            type: appActionIds.switchLang,
            payload: {
                lang: 'zh'
            }
        })).toEqual({
            ...initialState,
            locales: {
                lang: lng.locale,
                messages: lng.messages,
                formats: lng.formats
            }
        })
    });


    it('login - success', () => {
        const body = readJson('auth/login.json');
        expect(reducer(undefined, {
            type: `${authActionIds.login}-success`,
            payload: {
                body
            }
        })).toEqual({
            ...initialState,
            permission: body.data.permission,
            user: body.data
        });
    });

    it('logout - success', () => {
        const body = readJson('auth/logout.json');
        const ret = reducer({
            ...initialState,
            user: { x: 1 },
            permission: { y: 1 }
        }, {
            type: `${authActionIds.logout}-success`,
            payload: { body }
        });
        expect(ret).toEqual({
            ...initialState,
            user: {},
            permission: {}
        })
    });

    it('switchAuth', () => {
        const user = { name: 'hahaha' };
        expect(reducer(undefined, { type: authActionIds.switchAuth, payload: { user } })).toEqual({
            ...initialState,
            user,
        });
    });

})

