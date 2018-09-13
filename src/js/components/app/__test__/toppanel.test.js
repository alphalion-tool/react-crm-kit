import React from 'react';

import { mount } from 'jstest/helpers/enzyme';
import TopPanel from '../TopPanel';
import * as windows from 'jscom/utils/window';

describe('<TopPanel />', () => {

    let wrapper,
        props;

    beforeEach(() => {
        props = {
            isLogin: true,
            onLogout: jasmine.createSpy('onLogout'),
            onRemind: jasmine.createSpy('onRemind'),
            userName: 'admin',
        };
        wrapper = mount(
            <TopPanel {...props} />
        );
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    it('render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.text().trim()).toMatch(/\d{2}\/\d{2}\/\d{4}admin/);
    });

    it('menu open', () => {
        jasmine.clock().install();
        // 最后一个导航被激活，展开二级导航
        wrapper.find('TopPannel').find('p').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        expect(wrapper.find('Popup').find('Trigger').length).toEqual(2);
        expect(wrapper.state('visible')).toEqual(true);
    });

    it('click setting', () => {
        jasmine.clock().install();
        const openPwdSpy = spyOn(windows, 'openSettingSecurityPage');
        wrapper.find('TopPannel').find('p').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        // wrapper.find('Popup').find('Trigger').first().find('p').simulate('click');
        // expect(wrapper.state('pwdModalVisible')).toEqual(true);
        wrapper.find('Popup').find('Trigger').first().find('p').simulate('click');
        expect(openPwdSpy).toHaveBeenCalled();
    });

    it('click logout', () => {
        jasmine.clock().install();
        wrapper.find('TopPannel').find('p').simulate('mouseenter');
        jasmine.clock().tick(400);
        wrapper.update();
        wrapper.find('Popup').find('Trigger').last().find('p').simulate('click');
        expect(props.onLogout).toHaveBeenCalled();
    })

    it('isLogin = false', () => {
        props.isLogin = false;
        wrapper.setProps(props);
        expect(wrapper.html()).toEqual('<div class="s-top-panel__root"></div>');
    });

})