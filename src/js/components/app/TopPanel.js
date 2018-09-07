/**
 * Created by lishengyong on 2017/3/16.
 */

import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { Icon, Input, Dropdown, Menu } from 'antd';
import PasswordModal from 'jscom/routes/Settings/components/PasswordModal';
import * as windows from 'jscom/utils/window';
import './TopPanel.scss';

const propTypes = {
    isLogin: PropTypes.bool.isRequired,

    onLogout: PropTypes.func,
    onRemind: PropTypes.func,
    // 登录用户名
    name: PropTypes.string,
    businessDate: PropTypes.string,
};

export default class TopPannel extends Component {

    static propTypes = propTypes;

    /* istanbul ignore next */
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pwdModalVisible: false,
        };
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    handlePasswordChange = () => {
        windows.openResetPasswordPage();
        // this.setState({
            // pwdModalVisible: !this.state.pwdModalVisible
        // })
    }

    renderMenu () {
        const { onLogout } = this.props;
        return (
            <Menu className="s-top-panel__menu" theme="light">
                <Menu.Item>
                    <p onClick={this.handlePasswordChange}>Change Password</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={onLogout}>Quit</p>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { isLogin, onRemind, name, businessDate } = this.props;
        const { visible, pwdModalVisible } = this.state;
        // {false && <Icon type="bell" onClick={onRemind} />}
        return (
            <div className="s-top-panel__root">
                {isLogin && <div className="s-top-panel">
                    <div className="s-top-panel__right">
                        <span className="s-top-panel__bisdate">{businessDate}</span>

                        <Dropdown className="s-top-panel__name" overlay={this.renderMenu()} onVisibleChange={this.handleVisibleChange}>
                            <p>{name}&nbsp;<Icon type={visible ? 'caret-up' : 'caret-down'} /></p>
                        </Dropdown>
                    </div>
                </div>}
                {pwdModalVisible && <PasswordModal onClose={this.handlePasswordChange} />}
            </div>
        );
    }

}