
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Cookie from 'react-cookie';
import { bind } from 'decko';
import ReactRouterProps from 'react-router-prop-types';
import SideBar from 'jscom/components/app/SideBar';
import { message, Modal } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth as AuthActions, app as AppActions } from 'jscom/actions';
import { loggerInject } from 'jscom/utils/decorators';
import { isOpenWindow, gotoLoginPage } from 'jscom/utils/window';
import Signals from 'jscom/utils/signals';
import Container from 'jscom/components/app/Container';
import { checkPermissionWrapper, permissionContextTypes } from 'jscom/utils/decorators/connectPermission';
import ErrorReport from 'jscom/utils/errorReport';
import LocalStore from 'jscom/utils/storage';
import { config as routes } from '../routes';
import Dashboard from 'jscom/routes/Dashboard';
import { startIdleCheck, clearIdleCheck } from 'jscom/utils/idleLogout';
import { addVisibleListener } from 'jscom/utils/pageVisibleChange';
import NotFound from 'jscom/containers/NotFound';
import NavCrumb from 'jscom/components/app/NavCrumb';

import './App.scss';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.element,
    permission: PropTypes.object,
    history: PropTypes.object,
    authName: PropTypes.string,
    router: PropTypes.object,
    location: ReactRouterProps.location,
    match: PropTypes.object
};

export function mapStore2Props(store) {
    const {
        warning,
        permission,
        user
    } = store.app || {};

    const { isLoggedIn, authName } = store.auth || {};

    return {
        isLoggedIn,
        authName,
        warning,
        permission,
        user
    };
}

export default @connect(mapStore2Props)
@loggerInject
class App extends Component {

    static propTypes = propTypes;

    static childContextTypes = permissionContextTypes;

    constructor(props, context) {
        super(props, context);
        this.childContext = {};
        this.resetChildContext(props.permission);
        this.isOpenWindow = isOpenWindow();
        this.routerContent = this.renderChildren();
        this.state = {
            authName: props.authName,
            permission: props.permission,
            collapsed: Cookie.load('collapsed') === '1',
            reminderStatus: false,
            idleLogoutVisible: false, // 提示登录窗口是否可见，这个跟auth expired相互屏蔽
        };
    }

    getChildContext() {
        return this.childContext;
    }

    componentWillMount() {
        ErrorReport.init({ url: '/javascript/add' });
        Signals.on('authExpired', this.handleAuthExpired);
    }

    componentDidMount() {
        window.__DATA__ = window.__DATA__ || {};
        const path = this.props.location.pathname;

        if (!this.props.isLoggedIn) {
            // 记录需要访问的链接，用于登录后直接跳转过去
            if (!path.startsWith('/auth')) {
                LocalStore.setRedirectUrl(`${path}${this.props.location.search}`);
            }
            gotoLoginPage();
        } else {
            startIdleCheck(this.handleIdleLogout);
        }
        Signals.on('authExpired', this.handleAuthExpired);
        addVisibleListener(this.handlePageVisbleChange);
    }

    componentWillReceiveProps(nextProps) {
        // 登录后退出
        if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
            // 退出
            if (nextProps.isLoggedIn === false) {
                const path = nextProps.location.pathname;
                if (!path.startsWith('/auth')) {
                    LocalStore.setRedirectUrl(`${path}${nextProps.location.search}`);
                }
                gotoLoginPage();
                this.props.dispatch(AppActions.RESETAPP);
                this.forceUpdate();
                return;
            } else {
                // 登录的时候，要恢复check
                startIdleCheck(this.handleIdleLogout);
            }   
        }

        if (nextProps.permission !== this.props.permission) {
            this.resetChildContext(nextProps.permission);
            this.setState({
                permission: nextProps.permission
            });
        }
        if (nextProps.authName !== this.props.authName) {
            this.setState({
                authName: nextProps.authName
            });
        }
    }

    resetChildContext(permission) {
        this.childContext = {
            permission,
            checkPermission: checkPermissionWrapper(permission)
        };
    }

    @bind
    handlePageVisbleChange (visible) {
        // console.log('page visible: ', visible, new Date());
        // console.log(window.__PAGE__.VISIBLE);
    }

    @bind
    handleIdleLogout () {
        // console.log('idle logout');
        const that = this;
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) return;
        
        // 此时需要提示用户该要退出重新登录了
        // console.log(Cookie.load('token'));
        Cookie.remove('token');
        // console.log(Cookie.load('token'));
        clearIdleCheck();
        this.setState({
            idleLogoutVisible: true,
        })
        Modal.error({
            title: 'Your session has expired',
            content: 'It’s been more than 60 minutes since you left the Falcon. Please log in again.',
            onOk () {
                // console.log('ok');
                that.setState({
                    idleLogoutVisible: false
                }, () => {
                    that.handleAuthExpired(true);
                })
            }
        })
    }

    @bind
    handleAuthExpired (withoutTip: bool) {
        // 如果已经有了，则只显示一个
        if (this.state.idleLogoutVisible) return;
        if (!withoutTip) message.error('Login status has expired');
        const path = this.props.location.pathname;
        if (!path.startsWith('/auth')) {
            LocalStore.setRedirectUrl(`${path}${this.props.location.search}`);
        }
        this.props.dispatch(AuthActions.switchAuth({ isLoggedIn: false, user: {} }));
    }

    handleToggleCollapsed = () => {
        const { collapsed } = this.state;
        const newCollapsed = !collapsed;
        Cookie.save('collapsed', newCollapsed ? '1' : '0');
        this.setState({
            collapsed: newCollapsed
        })
    }

    handleLogout = () => {
        this.props.dispatch(AuthActions.logout());
    }

    /* replaceFlag参数表示是否直接替换 */
    handlePushRoute = (route, replaceFlag) => {
        if (replaceFlag) {
            this.props.history.replace(route);
        } else if (this.props.history.location.pathname !== route) {
            this.props.history.push(route);
        }
    }

    handleRemind = () => {
        const reminderStatus = this.state.reminderStatus;
        this.setState({
            reminderStatus: !reminderStatus
        });
    }

    renderChildren () {
        return (
            <Switch>
                <Route {...Dashboard} path="/"  exact />
                <Route {...Dashboard} path="/dashboard" exact />
                {routes.map((route) => <Route strict key={`${route.path}`} {...route} />)}
                <Route component={NotFound} />
            </Switch>
        );
    }

    renderLoading () {
        return (
            <Container spinning={true}>
                <Container.Body />
            </Container>
        );
    }

    render() {
        const { authName, collapsed, permission } = this.state;
        const { location, isLoggedIn } = this.props;
        const siteName = 'BitBal Pro';
        const cls = classNames('app-container', {
            'app-container--logout': !isLoggedIn
        });

        return (
            <div className={cls}>
                {isLoggedIn && <SideBar
                    siteName={siteName}
                    userName={authName}
                    isLoggedIn={isLoggedIn}
                    router={this.props.router}
                    onPushRoute={this.handlePushRoute}
                    onRemind={this.handleRemind}
                    onLogout={this.handleLogout}
                    permission={permission}
                />}
                {isLoggedIn && <NavCrumb
                    siteName={siteName}
                    userName={authName}
                    isLoggedIn={isLoggedIn}
                    router={this.props.router}
                    onPushRoute={this.handlePushRoute}
                    onRemind={this.handleRemind}
                    onLogout={this.handleLogout}
                    permission={permission}
                    path={location.pathname}
                />}
                <div className={classNames('s-content', { 's-content--collapsed': collapsed })}>
                    {this.renderChildren()}
                </div>
                
            </div>
        );
    }
}