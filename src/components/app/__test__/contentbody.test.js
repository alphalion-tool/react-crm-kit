import React from 'react';

import { mount } from 'jstest/helpers/enzyme';
import ContentBody from '../ContentBody';

describe('<ContentBody />', () => {

    let wrapper,
        props;

    beforeEach(() => {
        props = {
            className: 'xxx-xxx',
            innerRef: jasmine.createSpy('ref'),
        };
        wrapper = mount(<ContentBody {...props}><div>this is body</div></ContentBody>);
    });

    it('render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.text()).toEqual('this is body');
    });

    it('with className', () => {
        expect(wrapper.html()).toEqual('<div class="s-content__body xxx-xxx"><div>this is body</div></div>');
    });

    it('with innerRef', () => {
        expect(props.innerRef).toHaveBeenCalled();
    });

})