
import React from 'react';
import { shallow, mount } from 'jstest/helpers/enzyme';
import NotFound from '../NotFound';

describe('NotFound Page', () => {

    it('render success', () => {
        const wrapper = shallow(<NotFound />);
        expect(wrapper.exists()).toEqual(true);
    });

})