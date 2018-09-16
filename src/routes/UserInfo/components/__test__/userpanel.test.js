/* eslint-disable max-len */

import React from 'react';
import { createStore } from 'jscom/store/createStore';
import { mountEnv, mountWithEnv } from 'jstest/helpers/enzyme';
import { newDiv } from 'jstest/helpers/dom';
import UserPanel from '../UserPanel';

import {
    getUserModel,
} from 'jstest/helpers/model';


xdescribe('UserInfo/components/UserPanel', () => {

    let props,
        pureWrapper,
        div,
        params,
        store;

    beforeEach(() => {
        div = newDiv();
        store = createStore({ ...window.__TEST__.STORE.getState() });

        props = {
            user: getUserModel().toForm(),
            type: 'new',
            onSave: jasmine.createSpy('onSave'),
            onTokenReset: jasmine.createSpy('onTokenReset'),
            onPasswordReset: jasmine.createSpy('onPasswordReset'),
        }

        pureWrapper = mountWithEnv(<UserPanel {...props} />, div, store);
    });

    it('render success', () => {
        expect(pureWrapper.exists()).toEqual(true);
        expect(pureWrapper.find('UserPanel').exists()).toEqual(true);
    });

    it('render Btns type = new', () => {
        expect(pureWrapper.find('Button').text()).toEqual('Submit');
    });

    it('render Btns type = info, editable = true', () => {
        pureWrapper.setProps({
            type: 'info'
        })

        expect(pureWrapper.find('Button').length).toEqual(4);
        expect(pureWrapper.find('Button').at(2).text()).toEqual('Save');
        expect(pureWrapper.find('Button').at(3).text()).toEqual('Cancel');
    });

    it('render Btns type = info, editable = false', () => {
        pureWrapper.setProps({
            type: 'info'
        })
        pureWrapper.update();
        pureWrapper.find('Button').last().simulate('click');
        expect(pureWrapper.find('Button').text()).toEqual('Edit');
    });

    xit('handleSave', () => {
        pureWrapper.setProps({
            type: 'info',
        });
        pureWrapper.setState({
            editable: true
        })
        pureWrapper.find('Button').at(2).props().onClick();
        expect(props.onSave).toHaveBeenCalled();
    });

    it('handleCancel', () => {
        pureWrapper.setProps({
            type: 'info'
        });
        pureWrapper.setState({
            editable: true
        })
        pureWrapper.find('Button').last().props().onClick();
        expect(pureWrapper.state().editable).toEqual(false);
    })

    it('handleToggleEdit', () => {
        pureWrapper.setProps({
            type: 'info',
        });
        pureWrapper.setState({ editable: false });
        expect(pureWrapper.state().editable).toEqual(false);
        pureWrapper.find('Button').last().props().onClick();
        expect(pureWrapper.state().editable).toEqual(true);
    });

})