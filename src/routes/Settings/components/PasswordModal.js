
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, message, Form, Input } from 'antd';
import services from 'jscom/services';

export default class PasswordModal extends PureComponent {

    static propTypes = {
        onClose: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            visible: true,
            loading: false,

            oldPassword: '',
            newPassword: '',
            againPassword: ''
        };
    }

    handleClose = () => {
        this.props.onClose();
    }

    handleOk = () => {

        const { oldPassword, newPassword, againPassword } = this.state;
        if (!oldPassword || !newPassword) {
            message.error('Please input old and new password');
            return;
        }

        if (newPassword !== againPassword) {
            message.error('Please confirm password');
            return;
        }

        this.setState({
            loading: true,
        });

        const params = {};

        params.newer = newPassword;
        params.origin = oldPassword;

        services.authPassword(params).then((res) => {
            message.success('Change password success!');
            this.setState({
                loading: false,
            }, () => {
                this.props.onClose();
            })
        }).catch((e) => {
            message.error(e.message);
            this.setState({
                loading: false
            })
        })
    }

    handleInputChange = (e, id) => {
        this.setState({
            [`${id}`]: e.target.value,
        })
    }


    render () {
        return (
            <Modal
                title="Change Password"
                visible={this.state.visible}
                confirmLoading={this.state.loading}
                onOk={this.handleOk}
                onCancel={this.handleClose}
                okText="Submit"
                width={300}
            >
                <Form>
                    <Form.Item label="Old Password">
                        <Input size="small" type="password" id="oldPassword" onChange={this.handleInputChange} />
                    </Form.Item>
                    <Form.Item label="New Password">
                        <Input size="small" type="password" id="newPassword" onChange={this.handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                        <Input size="small" type="password" id="againPassword" onChange={this.handleInputChange} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}