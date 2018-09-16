import React from 'react';
import { createStore } from 'jscom/store/createStore';
import { mountEnv, mountWithEnv } from 'jstest/helpers/enzyme';
import UserNew, { PureUserNew } from '../UserNew';
import * as windows from 'jscom/utils/window';
import services from 'jscom/services';
import { readJson } from 'jstest/data/config';

import {
    getUserModel,
} from 'jstest/helpers/model';

xdescribe('UserNew/containers/UserNew', () => {

    let props,
        pureWrapper,
        saveApiSpy,
        store;

    beforeEach(() => {
        store = createStore({ ...window.__TEST__.STORE.getState() });
        saveApiSpy = spyOn(services, 'userAdd').and.returnValue(Promise.resolve(readJson('user/add.json')));
        pureWrapper = mountEnv(<PureUserNew {...props} />, store);
    })

    it('render success', () => {
        expect(pureWrapper.exists()).toEqual(true);
        expect(pureWrapper.find('PureUserNew').exists()).toEqual(true);
        expect(pureWrapper.find('ContentBody').exists()).toEqual(true);
    });

    it('handleSave', () => {
        pureWrapper.find('UserPanel').props().onSave(getUserModel().toAPI());
        expect(saveApiSpy).toHaveBeenCalled();
    });

})