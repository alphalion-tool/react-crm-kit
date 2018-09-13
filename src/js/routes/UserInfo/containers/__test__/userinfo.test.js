import React from 'react';
import { createStore } from 'jscom/store/createStore';
import { mountEnv } from 'jstest/helpers/enzyme';
import { newDiv } from 'jstest/helpers/dom';
import UserInfo, { PureUserInfo, mapState2Props } from '../UserInfo';
import * as windows from 'jscom/utils/window';
import services from 'jscom/services';
import { readJson } from 'jstest/data/config';

import {
    getUserModel,
} from 'jstest/helpers/model';

xdescribe('UserInfo/containers/UserInfo', () => {

    let props,
        pureWrapper,
        div,
        saveSpy,
        saveApiSpy,
        fetchSpy,
        store;

    beforeEach(() => {
        div = newDiv();
        store = createStore({ ...window.__TEST__.STORE.getState() });
        fetchSpy = spyOn(services, 'userInfo').and.returnValue(Promise.resolve(readJson('user/info/{userId}.json')));
        saveApiSpy = spyOn(services, 'userInfoPost').and.returnValue(Promise.resolve(readJson('user/info/{userId}.json')));
        props = mapState2Props(store.getState(), { match: { params: { userId: '1111' } } });
        pureWrapper = mountEnv(<PureUserInfo {...props} />, store);
    })

    it('render success', () => {
        expect(pureWrapper.exists()).toEqual(true);
        expect(pureWrapper.find('PureUserInfo').exists()).toEqual(true);
        expect(pureWrapper.find('ContentBody').exists()).toEqual(true);
    });

    it('handleSave - have been called', (done) => {
        const callbackSpy = jasmine.createSpy('callback');
        pureWrapper.find('UserPanel').props().onSave(getUserModel().toAPI(), callbackSpy);
        expect(pureWrapper.state('status')).toEqual('loading');
        expect(saveApiSpy).toHaveBeenCalled();
        setTimeout(() => {
            pureWrapper.update();
            expect(pureWrapper.state('status')).toEqual('');
            expect(callbackSpy).toHaveBeenCalled();
            done();
        }, 100);
    });

    it('componentWillReceiveProps change userid', () => {
        pureWrapper.setProps({
            userId: '2111'
        });
        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy).toHaveBeenCalledWith({ userId: '2111' }, null);
    });


    it('handleTokenReset', () => {
        const tokenResetSpy = spyOn(services, 'userResetOtp').and.returnValue(Promise.resolve(readJson('user/info/{userId}.json')));
        pureWrapper.find('UserPanel').props().onTokenReset(getUserModel());
        expect(tokenResetSpy).toHaveBeenCalled();
    });


    it('handlePasswordReset', () => {
        const passwordResetSpy = spyOn(services, 'userResetPswd').and.returnValue(Promise.resolve(readJson('user/info/{userId}.json')));
        pureWrapper.find('UserPanel').props().onPasswordReset(getUserModel());
        expect(passwordResetSpy).toHaveBeenCalled();
    });


})