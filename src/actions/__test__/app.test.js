
import mockStore from 'jstest/helpers/store';
import { initialState } from 'jscom/reducers/app';
import actions, { actionIds } from 'jscom/actions/app';

describe('App actions', () => {

    let store;
    beforeEach(() => {
        store = mockStore({});
    })


    it('action total count', () => {
        expect(Object.keys(actions)).toEqual(
            ['switchLang', 'RESETAPP']
        );
    });


    it('switchLang', () => {
        const lang = 'zh';
        const expectedAction = {
            type: actionIds.switchLang,
            payload: {
                lang
            }
        };
        expect(actions.switchLang(lang)).toEqual(expectedAction);
    });

});
