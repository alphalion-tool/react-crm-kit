'use strict';

import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { bind } from 'decko';
import intlInject from 'jscom/utils/decorators/intlInject';
import loggerInject from 'jscom/utils/decorators/loggerInject';
import connectPermission from 'jscom/utils/decorators/connectPermission';
import { Button, Menu, PopOver, Select, Icon, Input } from 'antd';
import { sideRoutes as initialNavs, flattenNav, getNavItemWithRoute, navWithPermission } from 'jscom/config/navbar';
import './SideBar.scss';

const ButtonGroup = Button.Group;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const propTypes = {
    /* 权限 */
    permission: PropTypes.object,
    isLoggedIn: PropTypes.bool.isRequired,

    pathName: PropTypes.string.isRequired,
    
    /* 是否是折叠状态 */
    collapsed: PropTypes.bool.isRequired,
    siteName: PropTypes.string,
    authName: PropTypes.string,

    onToggleCollapsed: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired,
    onPushRoute: PropTypes.func.isRequired,
};

// 未折叠时候的样式
const menuStyle = {
    width: 220
};
// 折叠后的样式
const menuCollapsedStyle = {};

const overflowStyle = {
    overflowX: 'hidden',
    overflowY: 'auto'
};

const flattenNavs = flattenNav(initialNavs);

function getSelectPopupContainer (node) { return node.parentNode; }

export class SideBar extends Component {

    static propTypes = propTypes;

    constructor (props, context) {
        super(props, context);

        this.loadFlag = false;  // 用于区分是否加载tooltip的网络数据

        // toolTip的配置
        this.innerToolTip = {
            flag: false,
            rect: {},
            route: ''
        };

        const navs = this.newNavWithPermission(props.permission, props.authName);
        // 将数据扁平

        const menusData = this.getMenuSelectItemWithRoute(props.pathName, props.collapsed);
        
        this.state = {
            navs,
            authName: props.authName,
            selectedKeys: menusData.selectedKeys,
            selectedValues: menusData.selectedValues,
            openKeys: menusData.openKeys,
            popOverVisible: false,
            options: [],
        };
    }

    componentWillReceiveProps (nextProps) {
        if (!shallowEqual(nextProps, this.props)) {
            const authName = nextProps.authName;
            const navs = this.newNavWithPermission(nextProps.permission, authName);
            this.setState({
                navs,
                authName,
                ...this.getMenuSelectItemWithRoute(nextProps.pathName, nextProps.collapsed)
            })
        }
    }
    
    refPopOverSet = (r) => {
        this.refPopOver = r;
    }

    // need fix，目前是hack，针对admin特殊处理的
    newNavWithPermission = (permission, authName) => {
        let newNavs = [...initialNavs];
        if (authName && authName.toLocaleLowerCase() !== 'admin') {
            newNavs = navWithPermission(newNavs, permission);
        }
        return newNavs;
    }

    // 根据路由获取被选中的导航
    getMenuSelectItemWithRoute (pathname, collapsed) {
        const selectedItem = getNavItemWithRoute(pathname, flattenNavs);
        return {
            selectedValues: [],
            selectedKeys: selectedItem ? [selectedItem.lang_id] : [],
            openKeys: collapsed ? [] : (selectedItem ? ( selectedItem.parent ? selectedItem.parent.map((item) => item.lang_id) : [] ) : []),
        };
    }

    toggleCollapsed = () => {
        const { onToggleCollapsed } = this.props;
        onToggleCollapsed && onToggleCollapsed();
    }

    @bind
    handleLogoClick () {
        window.location.hash = '/dashboard';
    }

    handleSelectChange = (value, data) => {
        this.setState({ selectedValues: value });
    }

    handleMenuClick = (menu) => {
        this.setState({ popOverVisible: '' });
        if (menu.item && menu.item.props &&
            menu.item.props.data && menu.item.props.data.route) {
            this.props.onPushRoute(`${menu.item.props.data.route}`);
            this.setState({ selectedKeys: [menu.key] })
        }
    }

    handleMenuOpenChange = (openKeys) => {
        if (openKeys.length > 1) {
            this.setState({ openKeys: openKeys.slice(openKeys.length - 1) });
        } else {
            this.setState({ openKeys: openKeys })
        }
    }

    handleVisiableChange = (visible, menu) => {
        if (visible) {
            this.innerToolTip = menu;
        } else {
            this.innerToolTip = {};
        }

        this.setState({ popOverVisible: visible ? menu.lang_id : '' });
    }

    renderMenuItemTitle = (menuItem) => {
        return (
            <span>{menuItem.icon && <Icon type={menuItem.icon} />}<span>{this.intl(menuItem.lang_id)}</span></span>
        );
    }

    renderToolTip () {
        const props = {
            mode: 'multiple',
            onChange: this.handleSelectChange,
            value: this.state.selectedValues,
            options: this.state.options,
            getPopupContainer: getSelectPopupContainer,
        };

        this.handleToolTipSelectFetch();
        
        return (
            <div className="s-sidebar__tooltip">
                <div className="s-sidebar__tooltip__select">
                    <Select.Simple {...props} />
                </div>
                <div className="s-sidebar__tooltip__btn">
                    <Button type="primary" onClick={this.handleToolTipClick}>View Selected</Button>
                </div>
            </div>
        );
    }

    renderSubMenu (menu, level, baseKey = '') {
        // const key = `${baseKey}-${menu.id}`;
        const key = menu.lang_id;
        if (!menu.children || menu.children.length === 0) {
            return (
                <Menu.Item key={key} data={menu}>
                    {this.renderMenuItemTitle(menu)}
                </Menu.Item>
            );
        }
        // 有children
        if (level === 1) {
            return (
                <SubMenu key={key} title={this.renderMenuItemTitle(menu)}>
                    {menu.children.map((item) => this.renderSubMenu(item, level + 1, key))}
                </SubMenu>
            );
        } else {
            return (
                <MenuItemGroup key={key} title={this.renderMenuItemTitle(menu)}>
                    {menu.children.map((item) => this.renderSubMenu(item, level + 1, key))}
                </MenuItemGroup>
            );
        }
    }

    renderToggleBtn () {
        return null;
        // {isLoggedIn && <div className="s-sidebar__toggle" onClick={this.toggleCollapsed}>
        //     <Icon type={collapsed ? 'menu-right' : 'menu-left'} />
        // </div>
        // }

    }

    renderSearchBox () {
        const { isLoggedIn, collapsed, siteName, onSettings } = this.props;
        return null;
        // return (
        //     <div className="s-sidebar__input__root">
        //         {collapsed && <Icon type="search" className="s-sidebar__search-icon" />}
        //         {!collapsed && <Input prefix={<Icon type="search" />} placeholder="Search Navaigation" className="s-sidebar__input" />}
        //     </div>
        // );
    }

    render() {
        const { isLoggedIn, collapsed, siteName, onSettings } = this.props;
        const { openKeys, selectedKeys, navs } = this.state;

        return (
            <div className={classNames('s-sidebar', { 's-sidebar--collapsed': collapsed })}>
                <div className="s-sidebar__logo" onClick={this.handleLogoClick}><span>{siteName}</span></div>
                {this.renderSearchBox()}
                <div className="s-sidebar__menu" style={collapsed ? {} : overflowStyle}>
                    {isLoggedIn &&
                        <Menu
                            onClick={this.handleMenuClick}
                            style={collapsed ? menuCollapsedStyle : menuStyle}
                            mode="inline"
                            theme="dark"
                            className="s-sidebar__menu__root"
                            inlineIndent={20}
                            selectedKeys={selectedKeys}
                            openKeys={openKeys}
                            inlineCollapsed={collapsed}
                            onOpenChange={this.handleMenuOpenChange}
                        >
                            {navs.map((item) => this.renderSubMenu(item, 1))}
                        </Menu>
                    }
                    {this.renderToggleBtn()}
                </div>
            </div>
        );
    }
}

export default connectPermission()(intlInject(loggerInject(SideBar)));