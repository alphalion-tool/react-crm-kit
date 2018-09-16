
import React from 'react';
import { mountEnv } from 'jstest/helpers/enzyme';
import AccountListQuery from '../AccountListQuery';
import mockStore from 'jstest/helpers/store';

describe('AccountList/components/AccountListQuery', () => {

    let wrapper,
        store,
        props;

    beforeEach(() => {
        store = mockStore({ ...window.__TEST__.STORE.getState() });
        props = {
            onSearch: jasmine.createSpy('onSearch() spy'),
        };
        wrapper = mountEnv(<AccountListQuery {...props} />, store);
    });

    it('render success', () => {
        expect(wrapper.find('.c-query__line').length).toEqual(1);
    });

    it('user name input', () => {
        const inputNode = wrapper.find('QueryItem').first().find('input');
        inputNode.simulate('focus');
        inputNode.simulate('input', { target: { value: 'a', id: 'accountName' } });
        wrapper.update();
        expect(wrapper.state('querys').toJS()).toEqual({ accountName: 'a' });
    });

    it('click search', () => {
        wrapper.find('button').first().simulate('click');
        expect(props.onSearch).toHaveBeenCalledWith(jasmine.objectContaining({}));
    });

    it('name input & click search', () => {
        const inputNode = wrapper.find('QueryItem').first().find('input');
        inputNode.simulate('focus');
        inputNode.simulate('input', { target: { value: '1', id: 'accountName' } });
        wrapper.update();

        expect(wrapper.state('querys').toJS()).toEqual({ accountName: '1' });

        wrapper.find('button').first().simulate('click');
        expect(props.onSearch).toHaveBeenCalledWith(jasmine.objectContaining({
            accountName: '1'
        }));
    });


    it('input & clear', () => {
        const inputNode = wrapper.find('QueryItem').first().find('input');
        inputNode.simulate('focus');
        inputNode.simulate('input', { target: { value: '1', id: 'accountName' } });
        wrapper.update();

        wrapper.find('button').last().simulate('click');
        wrapper.update();
        expect(wrapper.state('querys').toJS()).toEqual({});
    });

});