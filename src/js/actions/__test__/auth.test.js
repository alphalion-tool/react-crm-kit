
import mockStore from 'jstest/helpers/store';
import { initialState } from 'jscom/reducers/auth';
import AuthActions, { actionIds } from 'jscom/actions/auth';
import { readJson } from 'jstest/data/config';
import axiosMock from 'jstest/data/axiosMock';
import services from 'jscom/services';

describe('Auth actions', () => {

    let store;
    beforeEach(() => {
        store = mockStore({});
    })

    it('action total count', () => {
        expect(Object.keys(AuthActions)).toEqual(
            ['login', 'logout', 'switchAuth']
        ); 
    });

    it('login - success', () => {
        const expectActions = [
            {
                type: actionIds.login,
                payload: {
                    name: 'bitbal',
                    token: '123456'
                }
            },
            {
                type: `${actionIds.login}-success`,
                payload: {
                    body: readJson('auth/login.json'),
                    name: 'bitbal',
                    token: '123456'
                }
            }
        ];
        store.dispatch(AuthActions.login('bitbal', '123456')).then(() => {
            expect(store.getActions()).toEqual(expectActions);
        })
    });

    it('login - failed', () => {
        axiosMock.reset();
        axiosMock.onPost(services.URL.authLogin).networkError();
        axiosMock.createMock();

        const expectedActions = [            
            { type: actionIds.login, payload: { name: 'bitbal', token: '123456' } },
            {   
                type: `${actionIds.login}-failure`, 
                payload: {}
            }
        ];
        store.dispatch(AuthActions.login('bitbal', '123456')).then(() => {
            expect(store.getActions()[0]).toEqual(expectedActions[0]);
            expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
            axiosMock.reset();
            axiosMock.createMock();
        });
    });

    it('logout - success', () => {
        const expectActions = [
            { type: actionIds.logout, payload: { name: null, token: null } },
            {
                type: `${actionIds.logout}-success`,
                payload: {
                    body: readJson('auth/logout.json'),
                    name: null,
                    token: null
                }
            }
        ];
        store.dispatch(AuthActions.logout()).then(() => {
            expect(store.getActions()).toEqual(expectActions);
        });
    });

    it('logout - failed', () => {
        axiosMock.reset();
        axiosMock.onPost(services.URL.authLogoutPost).networkError();
        axiosMock.createMock();

        const expectedActions = [            
            { type: actionIds.logout, payload: { name: null, token: null } },
            {   
                type: `${actionIds.logout}-failure`, 
                payload: {}
            }
        ];
        store.dispatch(AuthActions.logout()).then(() => {
            expect(store.getActions()[0]).toEqual(expectedActions[0]);
            expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
            axiosMock.reset();
            axiosMock.createMock();
        });
    });


    it('switch login/logout status', () => {
        const expectAction = {
            type: actionIds.switchAuth,
            payload: {
                isLoggedIn: true,
                authName: 'bitbal',
                user: { userName: 'bitbal' }
            }
        };
        const ret = AuthActions.switchAuth({ isLoggedIn: true, user: { userName: 'bitbal' } });
        expect(ret).toEqual(expectAction);
    });

});
