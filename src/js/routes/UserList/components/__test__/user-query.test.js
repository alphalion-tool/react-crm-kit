
import React from 'react';
import { mountEnv } from 'jstest/helpers/enzyme';
import UserListQuery from '../UserListQuery';
import mockStore from 'jstest/helpers/store';

describe('UserList/components/UserListQuery', () => {

    let wrapper,
        store,
        props;

    beforeEach(() => {
        store = mockStore({ ...window.__TEST__.STORE.getState() });
        props = {
            onSearch: jasmine.createSpy('onSearch() spy'),
        };
        wrapper = mountEnv(<UserListQuery {...props} />, store);
    });

    it('render success', () => {
        expect(wrapper.find('.c-query__line').length).toEqual(1);
    });

    it('user name input', () => {
        const inputNode = wrapper.find('QueryItem').first().find('input');
        inputNode.simulate('focus');
        inputNode.simulate('change', { target: { value: '1' } });
        wrapper.update();
        expect(wrapper.state('querys').toJS()).toEqual({ name: '1' });
    });

    it('click search', () => {
        wrapper.find('button').first().simulate('click');
        expect(props.onSearch).toHaveBeenCalledWith(jasmine.objectContaining({}));
    });

    it('name input & click search', () => {
        const inputNode = wrapper.find('QueryItem').first().find('input');
        inputNode.simulate('focus');
        inputNode.simulate('change', { target: { value: '1' } });
        wrapper.update();

        expect(wrapper.state('querys').toJS()).toEqual({ name: '1' });

        wrapper.find('button').first().simulate('click');
        expect(props.onSearch).toHaveBeenCalledWith(jasmine.objectContaining({
            name: '1'
        }));
    });


    it('input & clear', () => {
        const inputNode = wrapper.find('QueryItem').first().find('input');
        inputNode.simulate('focus');
        inputNode.simulate('change', { target: { value: '1' } });
        wrapper.update();

        wrapper.find('button').last().simulate('click');
        wrapper.update();
        expect(wrapper.state('querys').toJS()).toEqual({});
    });

});