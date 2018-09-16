import React from 'react';
import { createStore } from 'jscom/store/createStore';
import { mountEnv } from 'jstest/helpers/enzyme';
import Settings, { PureSettings, mapState2Props } from '../Settings';
import services from 'jscom/services';

describe('Settings/containers/Settings', () => {

    let props,
        pureWrapper,
        changePwdSpy,
        store;

    beforeEach(() => {
        store = createStore({ ...window.__TEST__.STORE.getState() });
        props = mapState2Props(store.getState());
        props.dispatch = jasmine.createSpy('dispatch');
        changePwdSpy = spyOn(services, 'authPassword').and.returnValue(Promise.resolve({}))

        pureWrapper = mountEnv(<PureSettings {...props} />, store);
    })

    it('render success', () => {
        expect(pureWrapper.exists()).toEqual(true);
        expect(pureWrapper.find('PureSettings').exists()).toEqual(true);
        expect(pureWrapper.find('ContentBody').exists()).toEqual(true);
        expect(pureWrapper.find('Input').length).toEqual(3);
        expect(pureWrapper.find('Button').length).toEqual(1);
    });

    it('handlePwdChange', () => {
        expect(pureWrapper.state()).toEqual({ oldPassword: '', newPassword: '', confirmPassword: '' });
        pureWrapper.find('Input').at(0).props().onChange({ target: { value: 'oldpwd' } }, pureWrapper.find('Input').at(0).props().id);
        pureWrapper.find('Input').at(1).props().onChange({ target: { value: 'newpwd' } }, pureWrapper.find('Input').at(1).props().id);
        pureWrapper.find('Input').at(2).props().onChange({ target: { value: 'newpwd' } }, pureWrapper.find('Input').at(2).props().id);        

        expect(pureWrapper.state()).toEqual({
            oldPassword: 'oldpwd',
            newPassword: 'newpwd',
            confirmPassword: 'newpwd'
        });
        pureWrapper.update();

        expect(pureWrapper.find('Input').at(0).props().value).toEqual('oldpwd');
        expect(pureWrapper.find('Input').at(1).props().value).toEqual('newpwd');
        expect(pureWrapper.find('Input').at(2).props().value).toEqual('newpwd');
    });

    it('handleSubmit', () => {
        pureWrapper.find('Button').props().onClick();
        expect(changePwdSpy).not.toHaveBeenCalled();

        // 只输入oldpwd
        pureWrapper.setState({
            oldPassword: 'oldpwd',
        });
        pureWrapper.find('Button').props().onClick();
        expect(changePwdSpy).not.toHaveBeenCalled();

        // 再输入newpwd
        pureWrapper.setState({
            oldPassword: 'oldpwd',
            newPassword: 'newpwd',
        });
        pureWrapper.find('Button').props().onClick();
        expect(changePwdSpy).not.toHaveBeenCalled();

        // 再输入confirmpwd
        pureWrapper.setState({
            oldPassword: 'oldpwd',
            newPassword: 'newpwd',
            confirmPassword: 'newpwd'
        });
        pureWrapper.find('Button').props().onClick();

        expect(changePwdSpy).toHaveBeenCalled();
    });

})