'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import { Message } from 'antd';
import { connect } from 'react-redux';
import Container from 'jscom/components/app/Container';
import { containerInject } from 'jscom/utils/decorators';
import UserPanel from '../components/UserPanel';
import UserSchema from 'jscom/schemas//UserSchema';

import services from 'jscom/services';

const propTypes = {
    match: PropTypes.object,
    status: PropTypes.string,
    userId: PropTypes.string
};

export function mapState2Props (store, ownProps) {
    const { userId } = ownProps.match.params;
    return {
        userId
    };
}

export class PureUserInfo extends Component {

    static propTypes = propTypes;

    constructor (props) {
        super(props);
        this.state = {
            user: new UserSchema({}),
            status: '',
            resetTokenStatus: '',
            resetPasswordStatus: ''
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId !== this.props.userId) {
            this.fetchData(nextProps.userId);
            this.setState({
                resetTokenStatus: '',
                resetPasswordStatus: ''
            })
        }
    }

    @bind
    fetchData(id) {
        const userId = id || this.props.userId;
        this.setState({
            status: 'loading'
        });
        services.userInfo({ userId }, null).then((res) => {
            const ret = res.data.data;
            this.setState({
                status: '',
                user: UserSchema.fromAPI(ret)
            })
        }).catch((e) => {
            Message.error(e.message);
            this.setState({
                status: ''
            })
        })
    }

    @bind
    handleSave (data, saveCallback) {
        this.logger.log(data);
        this.setState({
            status: 'loading'
        });
        services.userInfoPost({ userId: data.userId }, data).then((res) => {
            const ret = res.data.data;
            this.setState({
                status: '',
                user: UserSchema.fromAPI(data)
            });
            saveCallback();
        }).catch((e) => {
            this.setState({
                status: ''
            })
            Message.error(e.message);
        })
    }

    @bind
    handleTokenReset (data) {
        // reset token
        this.setState({
            resetTokenStatus: 'loading'
        });
        services.userResetOtp({ userId: data.userId }, {}).then((res) => {
            const ret = res.data.data;
            this.setState({
                resetTokenStatus: 'success',
            });
            Message.success(`Reset Success! The new google auth code had sent to ${data.email}`, 6);
            setTimeout(() => {
                this && this.setState({ resetTokenStatus: '' })
            }, 4000);
        }).catch((e) => {
            this.setState({
                resetTokenStatus: 'error'
            });
            Message.error(e.message);
        })
    }

    @bind
    handlePasswordReset (data) {
        // reset password
        this.setState({
            resetPasswordStatus: 'loading'
        });
        services.userResetPswd({ userId: data.userId }, null).then((res) => {
            const ret = res.data.data;
            this.setState({
                resetPasswordStatus: 'success',
            });
            Message.success(`Reset Success! The new password had sent to ${data.email}`, 6);
            setTimeout(() => {
                this && this.setState({ resetPasswordStatus: '' })
            }, 4000);
        }).catch((e) => {
            this.setState({
                resetPasswordStatus: 'error'
            });
            Message.error(e.message);
        })
    }

    render() {
        const { status, user, resetTokenStatus, resetPasswordStatus } = this.state;
        return (
            <Container spinning={status === 'loading'}>
                <Container.Body>
                    <UserPanel
                        type="info"
                        user={user.toForm()}
                        onSave={this.handleSave}
                        onTokenReset={this.handleTokenReset}
                        onPasswordReset={this.handlePasswordReset}
                        resetTokenStatus={resetTokenStatus}
                        resetPasswordStatus={resetPasswordStatus}
                    />
                </Container.Body>
            </Container>
        );
    }
}


export default connect(mapState2Props)(containerInject(PureUserInfo))