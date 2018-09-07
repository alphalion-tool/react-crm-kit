
import actions, { actionIds } from '../action';
import services from 'jscom/services';
import mockStore from 'jstest/helpers/store';
import { readJson } from 'jstest/data/config';
import axiosMock from 'jstest/data/axiosMock';

describe('UserList/modules/action', () => {

    let store;
    beforeEach(() => {
        store = mockStore({});
    });


    it('query success', () => {
        const expectedActions = [            
            { type: actionIds.search, payload: {} },
            { type: `${actionIds.search}-success`, 
                payload: {
                    body: readJson('user/query.json'),
                }
            }
        ];
        store.dispatch(actions.search()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('search - failed', () => {
        axiosMock.reset();
        axiosMock.onGet(services.URL.userQuery).networkError();
        axiosMock.createMock();

        const expectedActions = [            
            { type: actionIds.search, payload: {} },
            {   
                type: `${actionIds.search}-failure`, 
                payload: {}
            }
        ];
        store.dispatch(actions.search()).then(() => {
            expect(store.getActions()[0]).toEqual(expectedActions[0]);
            expect(store.getActions()[1].type).toEqual(expectedActions[1].type);

            axiosMock.reset();
            axiosMock.createMock();
        });
    })

});