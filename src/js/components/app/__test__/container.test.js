/* eslint-disable max-len */
import React from 'react';

import { mount } from 'jstest/helpers/enzyme';
import Container from '../Container';


describe('<Container />', () => {

    let wrapper;

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    it('render success', () => {
        wrapper = mount(<Container><div>this is content</div></Container>);
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('Spin').length).toEqual(1);
        expect(wrapper.text()).toEqual('this is content');
    });

    it('with className', () => {
        wrapper = mount(<Container className="xxxx-xxxx"><div>this is content</div></Container>);
        expect(wrapper.html()).toEqual('<div class="s-content-root xxxx-xxxx"><div class="c-spin-nested-loading"><div class="c-spin-container"><div>this is content</div></div></div></div>');
    });

    it('with spinning=true/false', () => {
        jasmine.clock().install();
        wrapper = mount(<Container spinning={true}><div>this is content</div></Container>);
        expect(wrapper.html()).toEqual('<div class="s-content-root"><div class="c-spin-nested-loading"><div><div class="c-spin c-spin-spinning"><span class="c-spin-dot"><i></i><i></i><i></i><i></i></span></div></div><div class="c-spin-container c-spin-blur"><div>this is content</div></div></div></div>');
        wrapper.setProps({ spinning: false });
        wrapper.update();
        jasmine.clock().tick(400);
        expect(wrapper.html()).toEqual('<div class="s-content-root"><div class="c-spin-nested-loading"><div class="c-spin-container"><div>this is content</div></div></div></div>');
    });

    it('with innerRef', () => {
        const refSpy = jasmine.createSpy('ref')
        wrapper = mount(<Container innerRef={refSpy}><div>this is content</div></Container>);
        expect(refSpy).toHaveBeenCalled();
    });

})