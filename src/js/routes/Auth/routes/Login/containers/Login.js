'use strict';

/* eslint-disable react/require-optimization */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import { intlInject, loggerInject } from 'jscom/utils/decorators';
import { Button, Input, Checkbox, message, Icon } from 'antd';
import { gotoRegisterPage } from 'jscom/utils/window';
import './Login.scss';

const propTypes = {
    onSignIn: PropTypes.func,
};

export default @intlInject
@loggerInject
class Login extends Component {

    static propTypes = propTypes;

    constructor (props) {
        super(props);
        const name = localStorage.getItem('name') || '';
        const password = localStorage.getItem('userKey') || '';
        const hasRemember = !!localStorage.getItem('hasRemember');
        this.state = {
            name,
            password,
            hasRemember
        };
    }

    @bind
    handleNameInputChange (e) {
        this.setState({
            name: e.target.value,
            password: ''
        });
    }

    @bind
    handlePwdInputChange (e) {
        this.setState({
            password: e.target.value
        });
    }

    @bind
    handCheckChange (value) {
        if (value) {
            this.setState({
                hasRemember: value.target.checked
            })
        }
    }

    @bind
    handleSignIn () {
        const { name, password, hasRemember } = this.state;
        if (hasRemember) {
            localStorage.setItem('name', name)
            localStorage.setItem('userKey', password)
            localStorage.setItem('hasRemember', true)
        } else {
            localStorage.removeItem('name');
            localStorage.removeItem('userKey');
            localStorage.removeItem('hasRemember');

        }
        this.props.onSignIn(name, password);

    }

    @bind
    handleRegister () {
        gotoRegisterPage();
    }

    @bind
    handleKeyPress (e) {
        const { name, password } = this.state;
        if (e.key === 'Enter') { // Login按钮必须要是可以点击的
            if (!name) {
                message.error('Username is required!');
                return;
            } else if (!password) {
                message.error('Password is required!');
                return;
            }
            this.handleSignIn();
        }
    }

    render() {
        const { hasRemember, name, password } = this.state;
        return (
            <div className="c-form c-form--stacked s-auth__form">
                <div className="s-content-container">
                    <legend>
                        <div className="s-content--logo">
                            <div className="s-content--logo-container" />
                        </div>
                    </legend>
                    
                    <Input
                        id="name"
                        prefix={<span className="s-content--login__icon"><Icon type="user" /></span>}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleNameInputChange}
                        placeholder="Username"
                        value={name}
                    />
                    
                    <Input
                        prefix={<span className="s-content--login__icon"><Icon type="lock" /></span>}
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.handlePwdInputChange}
                        placeholder="Password"
                        onKeyPress={this.handleKeyPress}
                        value={password}
                    />

                    <Checkbox id="remember" onChange={this.handCheckChange} checked={hasRemember} >{this.intl('common.string.rememberme')}</Checkbox>
                    <div className="s-auth__btns">
                        <Button type="primary" disabled={!(name && password)} onClick={this.handleSignIn}>{this.intl('common.string.login')}</Button>
                    </div>
                </div>
            </div>
        );
    }

}