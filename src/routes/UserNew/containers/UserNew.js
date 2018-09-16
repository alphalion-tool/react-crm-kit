'use strict';

import React, { Component } from 'react';
import { bind } from 'decko';
import Container from 'jscom/components/app/Container';
import { message } from 'antd';
import { containerInject } from 'jscom/utils/decorators';
import UserPanel from 'jscom/routes/UserInfo/components/UserPanel';
import UserSchema from 'jscom/schemas//UserSchema';
import services from 'jscom/services';
import * as windows from 'jscom/utils/window';

export class PureUserNew extends Component {

    state = {
        user: new UserSchema({}),
        status: ''
    };

    @bind
    handleSubmit (data) {
        this.setState({
            status: 'loading'
        });
        services.userAdd(data).then((res) => {
            const ret = res.data.data;
            this.setState({
                status: '',
                user: new UserSchema({})
            })
            message.success(`Create User(${ret.userId}) Done!`);
            this.tabClose(() => {
                windows.openUserInfo(ret.userId);
            })
        }).catch((e) => {
            this.setState({
                status: ''
            })
            message.error(`Create User Error(${e.message})`);
        })
    }

    render() {
        const { status, user } = this.state;
        return (
            <Container spinning={status === 'loading'}>
                <Container.Nav hiddenInTab={true}>
                    <Container.Nav.Title>Create User</Container.Nav.Title>
                </Container.Nav>
                <Container.Body>
                    <UserPanel
                        type="new"
                        user={user.toForm()}
                        onSave={this.handleSubmit}
                    />
                </Container.Body>
            </Container>
        );

    }
}

export default containerInject(PureUserNew)