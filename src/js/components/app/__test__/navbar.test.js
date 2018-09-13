import React from 'react';

import { mountEnv } from 'jstest/helpers/enzyme';
import { createStore } from 'jscom/store/createStore';
import NavBar from '../NavBar';

xdescribe('<NavBar />', () => {

    let wrapper,
        props,
        store;

    beforeEach(() => {
        props = {
            isLoggedIn: true,
            onPushRoute: jasmine.createSpy('onPushRoute'),
            onLogout: jasmine.createSpy('onLogout'),
            pathName: '/xxx',
            userName: 'admin'
        };
        store = createStore({ ...window.__TEST__.STORE.getState() });
        wrapper = mountEnv(<NavBar {...props} />, store);
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    it('render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('SubNav').length).toEqual(9);
        expect(wrapper.find('SubNav').first().text()).toEqual('Accounts');
        expect(wrapper.find('.s-top-panel__bisdate').text()).toEqual('11/21/2017');
        expect(wrapper.find('TopPannel').find('Trigger').text().trim()).toEqual('admin');

        props.authName = 'x12';
        wrapper.setProps(props);
        wrapper.update();
        expect(wrapper.find('TopPannel').find('Trigger').text().trim()).toEqual('x12');
    });

    it('subnav count', () => {
        jasmine.clock().install();
        expect(wrapper.find('SubNav').length).toEqual(9);

        // 第一个被hover
        wrapper.find('SubNav').at(0).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('SubNav').at(0).find('NavItem').length).toEqual(13);

        // 第2个被hover
        wrapper.find('SubNav').at(1).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('SubNav').at(1).find('NavItem').length).toEqual(7);

        // 第3个被hover
        wrapper.find('SubNav').at(2).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('SubNav').at(2).find('NavItem').length).toEqual(9);

        // 第4个被hover
        wrapper.find('SubNav').at(3).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('SubNav').at(3).find('NavItem').length).toEqual(4);

        // 第6个被hover
        wrapper.find('SubNav').at(6).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('SubNav').at(6).find('NavItem').length).toEqual(7);

        // 第7个被hover
        wrapper.find('SubNav').at(7).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('SubNav').at(7).find('NavItem').length).toEqual(2);

        // 第5个被hover（比较特殊）<--------
        wrapper.find('SubNav').at(4).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('SubNav').at(4).find('NavItem').length).toEqual(8);
        expect(wrapper.find('SubNav').at(4).children().find('SubNav').length).toEqual(0);
    })


    it('hover subnav', (done) => {
        jasmine.clock().install();
        expect(wrapper.find('SubNav').first().text()).toEqual('Accounts');

        // 最后一个导航被激活，展开二级导航
        wrapper.find('SubNav').at(7).find('.c-navitem__title').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();

        expect(wrapper.find('SubNav').at(7).find('NavItem').length).toEqual(3);

        wrapper.find('SubNav').at(7).find('NavItem').first().simulate('click');
        done();
    });

    it('logout click', () => {
        jasmine.clock().install();
        // 最后一个导航被激活，展开二级导航
        wrapper.find('TopPannel').find('p').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        wrapper.find('TopPannel').find('MenuItem').last().find('p').simulate('click');
        expect(props.onLogout).toHaveBeenCalled();
    })
})