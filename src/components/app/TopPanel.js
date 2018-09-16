/**
 * Created by lishengyong on 2017/3/16.
 */

import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { bind } from 'decko';
import { Icon, Input, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import PasswordModal from 'jscom/routes/Settings/components/PasswordModal';
import * as windows from 'jscom/utils/window';
import { todayStr } from 'jscom/utils/time';
import './TopPanel.scss';

const propTypes = {
    isLogin: PropTypes.bool.isRequired,

    onLogout: PropTypes.func,
    onRemind: PropTypes.func,
    // 登录用户名
    userName: PropTypes.string,
    businessDate: PropTypes.string,
};

export default class TopPannel extends Component {  // eslint-disable-line

    static propTypes = propTypes;

    /* istanbul ignore next */
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pwdModalVisible: false,
        };
    }

    @bind
    handleVisibleChange (visible) {
        this.setState({ visible });
    }
    
    renderMenu () {
        const { onLogout } = this.props;
        return (
            <Menu className="s-top-panel__menu" theme="light">
                <Menu.Item>
                    <Link to="/settings/security">Change Password</Link>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={onLogout}>Quit</p>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { isLogin, onRemind, userName } = this.props;
        const { visible, pwdModalVisible } = this.state;
        const curDay = todayStr();
        // {false && <Icon type="bell" onClick={onRemind} />}
        return (
            <div className="s-top-panel__root">
                {isLogin && <div className="s-top-panel">
                    <div className="s-top-panel__right">
                        <span className="s-top-panel__bisdate">{curDay}</span>

                        <Dropdown className="s-top-panel__name" overlay={this.renderMenu()} onVisibleChange={this.handleVisibleChange}>
                            <p>{userName}&nbsp;<Icon type={visible ? 'caret-up' : 'caret-down'} /></p>
                        </Dropdown>
                    </div>
                </div>}
                {pwdModalVisible && <PasswordModal onClose={this.handlePasswordChange} />}
            </div>
        );
    }

}