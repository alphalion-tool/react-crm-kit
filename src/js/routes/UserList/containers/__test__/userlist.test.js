/* eslint-disable camelcase */


import React from 'react';

import { injectReducer } from 'jscom/store/reducers';
import { mountEnv } from 'jstest/helpers/enzyme';
import { createStore } from 'jscom/store/createStore';
import UserList, { PureUserList, mapState2Props } from '../UserList';
import reducer, { reducerFactory } from '../../modules/reducer';
import Actions from '../../modules/action';
import { getUserQuery } from 'jstest/helpers/store';
import * as windows from 'jscom/utils/window';

import {
    tableCellWithRowCol,
    resetCompSize,
    getCompSize,
} from 'jstest/helpers/utils';


describe('UserList/containers/UserList', () => {

    let store,
        props,
        searchSpy,
        wrapper;

    beforeEach(() => {
        store =  createStore({ ...window.__TEST__.STORE.getState() });
        injectReducer(store, {
            key: 'userList',
            reducer
        });
        props = {
            ...mapState2Props(store.getState()),
            checkPermission: jasmine.createSpy('checkPermission').and.returnValue(true),
            dispatch: jasmine.createSpy('dispatch')
        };
        searchSpy = spyOn(Actions, 'search');
        wrapper = mountEnv(<PureUserList {...props} />, store);
    });

    it('render success', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('UserListQuery').exists()).toEqual(true);
        expect(wrapper.find('BlueseaTable').exists()).toEqual(true);
    });

    it('search', () => {
        wrapper.find('UserListQuery').props().onSearch();
        expect(searchSpy).toHaveBeenCalled();
        expect(searchSpy).toHaveBeenCalledWith(undefined);
    });

    it('add new btn', () => {
        const newUserSpy = spyOn(windows, 'openCreatePage');
        const tableContent = wrapper.find('BlueseaTable');
        tableContent.find('.fonticon-plus-sign').simulate('click');
        expect(newUserSpy).toHaveBeenCalledWith('user');
    });

    it('userlist render', () => {
        wrapper.setProps({
            ...props,
            userList: getUserQuery(),
        });
        wrapper.update();
        expect(wrapper.state('tableList').getSize()).toEqual(getUserQuery().length);
    });

    it('click table list row', () => {
        const openCompanySpy = spyOn(windows, 'openCompanyInfo'),
            openCorrespondentSpy = spyOn(windows, 'openCorrespondentInfo'),
            openUserSpy = spyOn(windows, 'openUserInfo');

        wrapper.setProps({
            ...props,
            userList: getUserQuery(),
        });
        wrapper.update();

        const tableContent = wrapper.find('BlueseaTable');
        const rowData = getUserQuery(0);

        // 点击第一行第一列
        const cell0_0 = tableCellWithRowCol(tableContent, 0, 0);
        cell0_0.find('.c-table__cell--custom__content').simulate('click');

        expect(openUserSpy).toHaveBeenCalled();
        expect(openUserSpy).toHaveBeenCalledWith(rowData.userId);

        // 点击第一行第二列
        const cell0_1 = tableCellWithRowCol(tableContent, 0, 1);
        cell0_1.find('.c-table__cell--custom__content').simulate('click');

        expect(openUserSpy).toHaveBeenCalled();
        expect(openUserSpy).toHaveBeenCalledWith(rowData.userId);

        // 点击第一行第7列
        const cell0_6 = tableCellWithRowCol(tableContent, 0, 6);
        cell0_6.find('.c-table__cell--custom__content').simulate('click');

        expect(openCorrespondentSpy).toHaveBeenCalled();
        expect(openCorrespondentSpy).toHaveBeenCalledWith(rowData.correspondentId);

        // 点击第一行第6列
        const cell0_7 = tableCellWithRowCol(tableContent, 0, 7);
        cell0_7.find('.c-table__cell--custom__content').simulate('click');

        expect(openCompanySpy).toHaveBeenCalled();
        expect(openCompanySpy).toHaveBeenCalledWith(rowData.companyId);
    });

    it('resize width', () => {
        jasmine.clock().install();
        resetCompSize(wrapper.find('ContentBody'), 200, 300);
        wrapper.setProps({ layoutWidth: 200, layoutHeight: 300 });
        jasmine.clock().tick(200);
        
        const size = getCompSize(wrapper.find('BlueseaTable'));
        expect(size.width).toEqual(160);
        jasmine.clock().uninstall();
    });

})