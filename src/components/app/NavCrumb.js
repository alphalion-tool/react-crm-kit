/* eslint-disable no-unreachable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import Navs, { flattenNav, getNavItemWithRoute } from 'jscom/config/navbar';
import { intlInject, loggerInject } from 'jscom/utils/decorators';
import TopPanel from './TopPanel';
import { memoize } from 'decko';

const propTypes = {
    /* 路由路径，比如/mt/accounts，route will be found in config/routes.js */
    path: PropTypes.string,
    /* content会优先展示 */
    content: PropTypes.node,

    permission: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,

    userName: PropTypes.string,

    onPushRoute: PropTypes.func.isRequired,
    onRemind: PropTypes.func,
    onLogout: PropTypes.func,

    collapsed: PropTypes.bool,

};

const newNavs = flattenNav(Navs);

export default
@intlInject
@loggerInject
class NavCrumb extends PureComponent {

    static propTypes = propTypes;

    @memoize
    getItemWithRoute (path) {
        return getNavItemWithRoute(path, newNavs);
    }

    @memoize
    navItem2Breadcrumb (key, navItem) {
        const breads = [];
        breads.push({
            title: navItem.lang_id,
            // href: navItem.route,
            key: navItem.lang_id,
            icon: navItem.icon
        });
        if (navItem.parent) {
            navItem.parent.forEach((item) => {
                breads.unshift({
                    title: item.lang_id,
                    href: item.route,
                    key: item.lang_id,
                    icon: item.icon
                });
            });
        }

        return breads;
    }

    renderItem (item) {
        return (
            <Breadcrumb.Item>
                {item.icon && <Icon type={item.icon} />}
                <span>{this.intl(item.title)}</span>
            </Breadcrumb.Item>
        );
    }

    render() {
        const { isLoggedIn, userName, path, content } = this.props;
        
        if (content) {
            return (
                <Breadcrumb className="s-content__breadcrumb">
                    <Breadcrumb.Item>{content}</Breadcrumb.Item>
                </Breadcrumb>
            );
        }
        const navItem = this.getItemWithRoute(path);
        if (!navItem) {
            this.logger.error(`not found router breadcrumb ${path}, please check`);
            return (
                <Breadcrumb className="s-content__breadcrumb" />
            );
        }
        const crumbs = this.navItem2Breadcrumb(navItem.route, navItem);
        return (
            <div className="s-breadcrumb">
                <Breadcrumb className="s-content__breadcrumb">
                    {crumbs.map((item) => this.renderItem(item))}
                </Breadcrumb>

                <TopPanel
                    isLogin={isLoggedIn}
                    onLogout={this.props.onLogout}
                    onRemind={this.props.onRemind}
                    userName={userName}
                />

            </div>
        );
    }

}