'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { cloneDeep } from 'jscom/utils/lodash';
import { Link } from 'react-router-dom';
import intlInject from 'jscom/utils/decorators/intlInject';
import loggerInject from 'jscom/utils/decorators/loggerInject';
import connectPermission from 'jscom/utils/decorators/connectPermission';
import { sideRoutes as initialNavs, flattenNav, getNavItemWithRoute, navWithPermission } from 'jscom/config/navbar';
import { Menu, Icon } from 'antd';
import TopPanel from './TopPanel';
import './NavBar.scss';

const SubMenu = Menu.SubMenu;

const propTypes = {
    /* 权限 */
    permission: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,

    pathName: PropTypes.string.isRequired,

    /* 是否是折叠状态 */
    siteName: PropTypes.string,
    authName: PropTypes.string,

    onPushRoute: PropTypes.func.isRequired,
    onRemind: PropTypes.func,
    onLogout: PropTypes.func,

    collapsed: PropTypes.bool,
};

const flattenNavs = flattenNav(initialNavs);

export class PureNavBar extends Component {

    static propTypes = propTypes;

    constructor(props, context) {
        super(props, context);

        const navs = this.newNavWithPermission(props.permission);
        // 将数据扁平

        const menusData = this.getMenuSelectItemWithRoute(props.pathName, props.collapsed);

        this.state = {
            navs,
            selectedKeys: menusData.selectedKeys,
            selectedValues: menusData.selectedValues,
            openKeys: menusData.openKeys,
            popOverVisible: false,
            options: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        /* istanbul ignore else */
        if (!shallowEqual(nextProps, this.props)) {
            const navs = this.newNavWithPermission(nextProps.permission);
            this.setState({
                navs,
                ...this.getMenuSelectItemWithRoute(nextProps.pathName, nextProps.collapsed)
            })
        }
    }

    // need fix，目前是hack，针对admin特殊处理的
    newNavWithPermission = (permission, authName) => {
        let newNavs = cloneDeep(initialNavs);
        // if (authName && authName.toLocaleLowerCase() !== 'admin') {
        newNavs = navWithPermission(newNavs, permission);
        // }
        return newNavs;
    }

    // 根据路由获取被选中的导航
    getMenuSelectItemWithRoute(pathname, collapsed) {
        const selectedItem = getNavItemWithRoute(pathname, flattenNavs);
        return {
            selectedValues: [],
            selectedKeys: selectedItem ? [selectedItem.lang_id] : [],
            // openKeys: collapsed ? [] : (selectedItem ? (selectedItem.parent ? selectedItem.parent.map((item) => item.lang_id) : []) : []),
        };
    }

    renderMenuItemTitle = (menuItem) => {
        if (menuItem.route) {
            // 针对测试做专门处理，否则需要外层增加router支持
            if (process.env.NODE_ENV === 'test') {
                return <span><a href={menuItem.route}>{this.intl(menuItem.lang_id)}</a></span>;
            }
            return (
                <span><Link to={menuItem.route}>{this.intl(menuItem.lang_id)}</Link></span>
            );
        }
        return (
            <span>{this.intl(menuItem.lang_id)}</span>
        );
    }

    renderSubMenu(menu, level, baseKey = '') {
        const key = menu.lang_id;
        if (!menu.children || menu.children.length === 0) {
            return (
                <Menu.Item key={key} data={menu}>
                    {this.renderMenuItemTitle(menu)}
                </Menu.Item>
            );
        }
        const props = {
            key,
            title: this.renderMenuItemTitle(menu),
            getPopupContainer: undefined,
            level
        };
        /* istanbul ignore else */
        if (process.env.NODE_ENV === 'test') {
            props.getPopupContainer = (node) => node;
        }
        return (
            <SubMenu {...props}>
                {menu.children.map((item) => this.renderSubMenu(item, level + 1, key))}
            </SubMenu>
        );
    }

    render() {
        const { isLoggedIn, siteName, authName } = this.props;
        const { selectedKeys, navs } = this.state;

        return (
            <div className={classNames('s-navbar')}>
                <div className="s-navbar__logo"><span>&nbsp;</span></div>

                {isLoggedIn && <div className="s-navbar__menu">
                    <Menu mode="horizontal">{navs.map((item) => this.renderSubMenu(item, 2))}</Menu>
                </div>}
                <TopPanel
                    isLogin={isLoggedIn}
                    onLogout={this.props.onLogout}
                    onRemind={this.props.onRemind}
                    name={authName}
                    businessDate={window.__DATA__.BUSINESS_DATE}
                />
            </div>
        );
    }
}

export default connectPermission()(intlInject(loggerInject(PureNavBar)));