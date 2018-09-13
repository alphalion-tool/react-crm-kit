import React from 'react';
import { createStore } from 'jscom/store/createStore';
import { mountEnv, mountWithEnv } from 'jstest/helpers/enzyme';
import UserForm from '../UserForm';

import { getUserModel } from 'jstest/helpers/model';

xdescribe('UserInfo/components/UserForm', () => {

    let props,
        wrapper,
        params,
        store;

    beforeEach(() => {
        store = createStore({ ...window.__TEST__.STORE.getState() });

        props = {
            user: getUserModel().toForm(),
            className: '',
            type: 'new',
            editable: false,
            onTokenReset: jasmine.createSpy('token reset'),
            onPasswordReset: jasmine.createSpy('password reset'),
            resetTokenStatus: '',
            resetPasswordStatus: ''
        }

        wrapper = mountEnv(<UserForm {...props} />, store);
    });

    it('editable = false, render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('FormItem').length).toEqual(10);
    });

    it('editable = true, type = new, render correct', () => {
        wrapper.setProps({
            editable: true,
            type: 'new'
        })
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('FormItem').length).toEqual(9);
        let labels = '';
        wrapper.find('FormItem').forEach((item) => {
            labels += item.props().label;
        });
        expect(labels).toEqual('User NameEmailFirst NameLast NamePhoneDescriptionCompanyCorrespondentRole');
    });

    it('editable = true, type = info', () => {
        wrapper.setProps({
            editable: true,
            type: 'info'
        });
        // render correct
        expect(wrapper.find('FormItem').length).toEqual(12);
        expect(wrapper.find('Form').find('Input').length).toEqual(4);
        expect(wrapper.find('Form').find('Button').length).toEqual(2);

        // click reset btn 
        wrapper.find('Form').find('PopConfirm').at(0).props().onConfirm();
        expect(props.onPasswordReset).toHaveBeenCalled();

        wrapper.find('Form').find('PopConfirm').at(1).props().onConfirm();
        expect(props.onTokenReset).toHaveBeenCalled();
    });


    it('reset token, password loading', () => {
        wrapper.setProps({
            editable: true,
            type: 'info',
            resetTokenStatus: 'loading',
            resetPasswordStatus: 'loading'
        });

        expect(wrapper.find('Form').find('Button').at(0).props().icon.props).toEqual({ type: 'repeat', spin: true });
        expect(wrapper.find('Form').find('Button').at(1).props().icon.props).toEqual({ type: 'repeat', spin: true });
    });


    it('reset token, password success', () => {
        wrapper.setProps({
            editable: true,
            type: 'info',
            resetTokenStatus: 'success',
            resetPasswordStatus: 'success'
        });

        expect(wrapper.find('Form').find('Button').at(0).props().icon.props).toEqual({ type: 'ok' });
        expect(wrapper.find('Form').find('Button').at(1).props().icon.props).toEqual({ type: 'ok' });
    });




})