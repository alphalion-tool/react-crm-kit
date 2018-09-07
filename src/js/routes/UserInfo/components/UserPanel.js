'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import { Button } from 'antd';
import FormPanel from 'jscom/components/app/FormPanel';
import UserSchema from 'jscom/schemas//UserSchema';
import { WithPermission } from 'jscom/utils/decorators/connectPermission';
import UserForm from './UserForm';
import { containerId } from '../config/form';

const propTypes = {
    user: PropTypes.object, // 需要展示的user
    type: PropTypes.string, // 从哪里来的, 'new', 'info'

    onSave: PropTypes.func.isRequired,  // 保存的回调 onSave(params, () => {})
    onDelete: PropTypes.func, // 删除的回调
    onTokenReset: PropTypes.func,  // token reset
    onPasswordReset: PropTypes.func,  // password reset
    resetTokenStatus: PropTypes.string,
    resetPasswordStatus: PropTypes.string,
};

export default class UserPanel extends PureComponent {

    static propTypes = propTypes;

    constructor (props) {
        super(props);
        const editable = props.type === 'new' || false;
        this.state = {
            editable,
        };
    }
    
    @bind
    infoRefSet (r) {
        this.infoRef = r;
    }

    @bind
    handleSave () {
        // 校验
        this.infoRef.validateFieldsAndScroll((errs, values) => {
            // 校验出错
            if (errs) return;
            values.userId = this.props.user.userId;
            if (values.password && values.password.match(/^(\*)*$/)) {
                delete values.password;
            }
            const newUser = new UserSchema(values);
            this.props.onSave(newUser.toAPI(), () => {
                this.handleToggleEdit();
            });
        });
        
    }

    @bind
    handleToggleEdit () {
        const editable = !this.state.editable;
        this.setState({
            editable,
        })
    }

    renderBtns () {
        // 说明是新建用户
        if (this.props.type === 'new') {
            return (
                <FormPanel.Control>
                    <Button type="primary" onClick={this.handleSave}>Submit</Button>
                </FormPanel.Control>
            );
        }

        // 浏览和编辑用户
        if (this.state.editable) {
            return (
                <FormPanel.Control>
                    <Button type="primary" onClick={this.handleSave}>Save</Button>
                    <Button type="danger" ghost onClick={this.handleToggleEdit}>Cancel</Button>
                </FormPanel.Control>
            );
        }
        return (
            <FormPanel.Control>
                <WithPermission module="user" operations="edit" text={<Button disabled type="primary">Edit</Button>}>
                    <Button type="primary" onClick={this.handleToggleEdit}>Edit</Button>
                </WithPermission>
            </FormPanel.Control>
        );
    }

    render() {
        const { editable } = this.state,
            { type, user, onTokenReset, onPasswordReset, resetTokenStatus, resetPasswordStatus } = this.props;
        return (
            <FormPanel>
                <FormPanel.Content>
                    <FormPanel.ScrollContainer id={containerId}>
                        <FormPanel.ScrollCard>
                            <FormPanel.ScrollCard.Title>User Info</FormPanel.ScrollCard.Title>
                            <UserForm
                                ref={this.infoRefSet}
                                user={user}
                                editable={editable}
                                type={type}
                                onTokenReset={onTokenReset}
                                onPasswordReset={onPasswordReset}
                                resetTokenStatus={resetTokenStatus}
                                resetPasswordStatus={resetPasswordStatus}
                            />
                        </FormPanel.ScrollCard>
                    </FormPanel.ScrollContainer>
                </FormPanel.Content>
                {this.renderBtns()}
            </FormPanel>
        );
    }
}