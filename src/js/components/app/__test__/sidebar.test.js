
import React from 'react';
import { mount } from 'enzyme';
import { attachMount } from 'jstest/helpers/enzyme';
import mockIntl, { mountWithIntl, intlMethodInject } from 'jstest/helpers/intl';
import { containerMethodInject } from 'jstest/helpers/decorator';
import SideBar from '../SideBar';
import SideBarConfig from 'jscom/config/navbar';

const PureSideBar = containerMethodInject(SideBar.WrappedComponent);

xdescribe('<SideBar />', () => {

    let div,
        wrapper;

    it('render <SideBar /> login status', () => {

        const pathName = `/${SideBarConfig[0].id}`;

        const props = {
            pathName: pathName,
            permission: window.__data.permission,
            isLoggedIn: true,
            collapsed: false,
            siteName: 'bitbal',
            authName: 'Admin',
            onToggleCollapsed: () => {},
            onSettings: () => {},
            onPushRoute: () => {}
        };
        wrapper = attachMount(<PureSideBar {...props} intl={mockIntl()} />, div);
        const menu = wrapper.find('.s-sidebar__menu__root');
        expect(wrapper.state('navs').length).toEqual(SideBarConfig.length);
        expect(menu.children().length).toEqual(SideBarConfig.length);
    });


    it('render <SideBar /> logout status', () => {

        const pathName = `/${SideBarConfig[0].id}`;

        const props = {
            pathName: pathName,
            permission: window.__data.permission,
            isLoggedIn: false,
            collapsed: false,
            siteName: 'bitbal',
            authName: 'Admin',
            onToggleCollapsed: () => {},
            onSettings: () => {},
            onPushRoute: () => {}
        };
        wrapper = attachMount(<PureSideBar {...props} intl={mockIntl()} />, div);
        // mountWithIntl(
        //     <SideBar {...props} />,
        //     div
        // );
        // takeScreenshot();
        expect(wrapper.find('.c-menu').length).toEqual(0);
    });

    it('render <SideBar /> active item', () => {
        const navIndex = 4;
        const pathName = `/${SideBarConfig[navIndex].id}`;

        const props = {
            pathName: pathName,
            permission: window.__data.permission,
            isLoggedIn: true,
            collapsed: false,
            siteName: 'bitbal',
            authName: 'Admin',
            onToggleCollapsed: () => {},
            onSettings: () => {},
            onPushRoute: () => {},
        };
        wrapper = attachMount(<PureSideBar {...props} intl={mockIntl()} />, div);
        // mountWithIntl(
        //     <SideBar {...props} />
        // );
        const menuItem = wrapper.find('.s-sidebar__menu__root').childAt(navIndex);

        expect(menuItem.hasClass('c-menu-submenu-selected') || menuItem.hasClass('c-menu-item-selected')).toEqual(true);
    });
});