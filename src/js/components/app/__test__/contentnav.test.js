import React from 'react';

import * as windows from 'jscom/utils/window';

import { mount } from 'jstest/helpers/enzyme';
import ContentNav from '../ContentNav';


describe('<ContentNav />', () => {

    let wrapper,
        props;

    beforeEach(() => {
        props = {};
        spyOn(windows, 'isOpenWindow').and.callFake(() => { return false; });
        wrapper = mount(
            <ContentNav {...props}>
                <ContentNav.Title>title</ContentNav.Title>
                <div>this is body</div>
            </ContentNav>
        );
    });

    it('render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.text()).toEqual('titlethis is body');
    });

    it('with className', () => {
        expect(wrapper.html()).toEqual('<div class="s-content__nav"><div class="s-content__title s-slide__nav">title</div><div>this is body</div></div>');
        props.className = 'xxx-yyy';
        wrapper.setProps(props);
        expect(wrapper.html()).toEqual('<div class="s-content__nav xxx-yyy"><div class="s-content__title s-slide__nav">title</div><div>this is body</div></div>');
        props.className = undefined;
        wrapper.setProps(props);
        expect(wrapper.html()).toEqual('<div class="s-content__nav"><div class="s-content__title s-slide__nav">title</div><div>this is body</div></div>');
    });

    it('with innerRef', () => {
        props.innerRef = jasmine.createSpy('ref');
        wrapper.setProps(props);
        expect(props.innerRef).toHaveBeenCalled();
    });

    it('hiddenInTab', () => {
        props.hiddenInTab = true;
        wrapper.setProps(props);
        expect(wrapper.html()).toEqual(null);
    });

})