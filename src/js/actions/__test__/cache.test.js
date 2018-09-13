
import mockStore from 'jstest/helpers/store';
import { initialState } from 'jscom/reducers/cache';
import actions, { actionIds } from 'jscom/actions/cache';
import { readJson } from 'jstest/data/config';
import axiosMock from 'jstest/data/axiosMock';
import services from 'jscom/services';

describe('Cache actions', () => {

    let store;
    beforeEach(() => {
        store = mockStore({});
    })

    it('total action count', () => {
        expect(Object.keys(actions)).toEqual([      
            'loadUsers',
        ]);
    });



    // it('loadCountry - success', () => {
    //     const expectedActions = [
    //         { type: actionIds.loadCountry, payload: {} },
    //         {
    //             type: `${actionIds.loadCountry}-success`,
    //             payload: {
    //                 body: readJson('const/country.json')
    //             }
    //         }
    //     ];
    //     store.dispatch(actions.loadCountry()).then(() => {
    //         expect(store.getActions()).toEqual(expectedActions);
    //     });
    // });

    // it('loadCountry - failed', () => {
    //     axiosMock.reset();
    //     axiosMock.onGet(services.URL.constCountry).networkError();
    //     axiosMock.createMock();

    //     const expectedActions = [
    //         { type: actionIds.loadCountry, payload: {} },
    //         {
    //             type: `${actionIds.loadCountry}-failure`,
    //             payload: {}
    //         }
    //     ];
    //     store.dispatch(actions.loadCountry()).then(() => {
    //         expect(store.getActions()[0]).toEqual(expectedActions[0]);
    //         expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    //         axiosMock.reset();
    //         axiosMock.createMock();
    //     });
    // });

});
