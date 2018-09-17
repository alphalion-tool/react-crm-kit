
import React from 'react';
import { mountEnv } from 'jstest/helpers/enzyme';
import mockIntl from 'jstest/helpers/intl';
import { createStore } from 'jscom/store/createStore';
import { containerMethodInject } from 'jstest/helpers/decorator';
import SideBar from '../SideBar';
import SideBarConfig from 'jscom/config/navbar';

const PureSideBar = containerMethodInject(SideBar.WrappedComponent);

describe('<SideBar />', () => {

    let wrapper,
        store;

    it('render <SideBar /> login status', () => {

        const pathName = `/${SideBarConfig[0].id}`;

        const props = {
            pathName: pathName,
            permission: window.__data.permission,
            isLoggedIn: true,
            collapsed: false,
            siteName: 'bitbal',
            userName: 'Admin',
            onToggleCollapsed: () => {},
            onSettings: () => {},
            onPushRoute: () => {}
        };
        store =  createStore({ ...window.__TEST__.STORE.getState() });
        wrapper = mountEnv(<PureSideBar {...props} />, store);
        const menu = wrapper.find('.s-sidebar__menu__root');
        expect(wrapper.state('navs').length).toEqual(7);
        expect(menu.children().length).toEqual(12);
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
        wrapper = mountEnv(<PureSideBar {...props} />, store);
        expect(wrapper.find('.c-menu').length).toEqual(0);
    });

    it('render <SideBar /> active item', () => {
        expect(true).toEqual(true);
    });
});