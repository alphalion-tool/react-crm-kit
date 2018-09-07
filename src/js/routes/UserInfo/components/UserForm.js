'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bind } from 'decko';
import { Button, Input, PopConfirm, Icon, Form } from 'antd';

import { cloneDeep } from 'jscom/utils/lodash';
import { formDescriptions, mapData2Fields } from '../config/form';
import FormPanel, { withForm } from 'jscom/components/app/FormPanel';
import './UserForm.scss';

const propTypes = {
    user: PropTypes.object, // 需要展示的account
    type: PropTypes.string, // 从哪里来的, 'new', 'info'
    className: PropTypes.string,
    editable: PropTypes.bool,
    form: PropTypes.object,
    onTokenReset: PropTypes.func,  // token更新
    onPasswordReset: PropTypes.func,
    resetTokenStatus: PropTypes.string,
    resetPasswordStatus: PropTypes.string,
};

export default @withForm({
    /* 将props上的数据映射到form里 */
    mapPropsToFields: (props) => {
        const { user } = props;
        if (!user) return {};
        return mapData2Fields(user, formDescriptions);
    }
})
class UserForm extends Component {

    static propTypes = propTypes;

    @bind
    handleResetToken () {
        this.props.onTokenReset && this.props.onTokenReset(this.props.user);
    }

    @bind
    handleResetPassword () {
        this.props.onPasswordReset && this.props.onPasswordReset(this.props.user);
    }

    // 编辑状态下的渲染函数
    @bind
    renderEditItem (key, children, readOnly) {
        const label = formDescriptions[key].label;
        const { getFieldError, getFieldDecorator } = this.props.form;
        const error = getFieldError(key);
        const desc = cloneDeep(formDescriptions[key]);
        if (readOnly) delete desc.rules;
        const fieldDecorator = getFieldDecorator(key, desc);
        if (readOnly) {
            return this.renderViewItem(key, children);
        }
        return (
            <Form.Item
                label={label}
                help={error ? error[0] : ''}
                validateStatus={error ? 'error' : ''}
            >
                {fieldDecorator(children)}
            </Form.Item>
        );
    }

    // 预览状态下的渲染函数
    renderViewItem = (key, children) => {
        const label = formDescriptions[key].label;
        return (
            <Form.Item label={label}>
                <FormPanel.P>{children}</FormPanel.P>
            </Form.Item>
        );
    }

    // render reset token btn
    renderTokenBtn () {
        let btnText = 'Reset';
        const btnProps = {
            type: 'primary',
            ghost: true,
            size: 'small',
            icon: null,
        };
        if (this.props.resetTokenStatus === 'loading') {
            btnProps.icon = <Icon type="repeat" spin />;
        }
        if (this.props.resetTokenStatus === 'success') {
            btnProps.icon = <Icon type="ok" />;
            btnProps.type = 'success';
            btnProps.ghost = false;
            btnText = 'Reset Success';
        }

        return (
            <PopConfirm title="Are you sure want to reset Google Auth Code?" onConfirm={this.handleResetToken}>
                <Button className="s-userinfo__reset-btn" {...btnProps}>{btnText}</Button>
            </PopConfirm>
        );
    }

    // render password btn
    renderPasswordBtn () {
        let btnText = 'Reset';
        const btnProps = {
            type: 'primary',
            ghost: true,
            size: 'small',
            icon: null,
        };
        if (this.props.resetPasswordStatus === 'loading') {
            btnProps.icon = <Icon type="repeat" spin />;
        }
        if (this.props.resetPasswordStatus === 'success') {
            btnProps.icon = <Icon type="ok" />;
            btnProps.type = 'success';
            btnProps.ghost = false;
            btnText = 'Reset Success';
        }
        return (
            <PopConfirm title="Are you sure want to reset password?" onConfirm={this.handleResetPassword}>
                <Button className="s-userinfo__reset-btn" {...btnProps}>{btnText}</Button>
            </PopConfirm>
        );
    }

    render() {
        const { user, className, editable, form, type } = this.props;
        const { getFieldValue } = form;
        const cls = classNames('s-formpanel__form', {
            's-formpanel__form-view': !editable,
        }, className);

        // 编辑状态，如果是更改内容的话，email和userName则不可更改
        if (editable) {
            return (
                <Form labelLayout="left" className={cls}>
                    {type !== 'new' && this.renderEditItem('userId', user.userId, true)}
                    {type === 'new' ? this.renderEditItem('userName', <Input size="small" autoComplete="off" />) : this.renderEditItem('userName', user.userName, true)}
                    {type === 'new' ? this.renderEditItem('email', <Input size="small" autoComplete="off" />) : this.renderEditItem('email', user.email, true) }
                    {this.renderEditItem('firstName', <Input size="small" autoComplete="off" />)}
                    {this.renderEditItem('lastName', <Input size="small" autoComplete="off" />)}
                    {this.renderEditItem('phone', <Input size="small" autoComplete="off" />)}
                    {this.renderEditItem('description', <Input size="small" autoComplete="off" />)}
                    {type !== 'new' && this.renderEditItem('password', this.renderPasswordBtn())}
                    {type !== 'new' && this.renderViewItem('token', this.renderTokenBtn())}
                </Form>
            );            
        }

        // 预览状态
        return (
            <Form labelLayout="left" className={cls}>
                {this.renderViewItem('userId', user.userId)}
                {this.renderViewItem('userName', user.userName)}
                {this.renderViewItem('email', user.email)}
                {this.renderViewItem('firstName', user.firstName)}
                {this.renderViewItem('lastName', user.lastName)}
                {this.renderViewItem('phone', user.phone)}
                {this.renderViewItem('description', user.description)}
            </Form>
        );

    }
}