'use strict';

import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { bind } from 'decko';
import { connect } from 'react-redux';
import Container from 'jscom/components/app/Container';
import { containerInject } from 'jscom/utils/decorators';
import { Select, Button, Message, Input } from 'antd';
import AppActions from 'jscom/actions/app';
import './Settings.scss';
import services from 'jscom/services';

const LanguageOptions = [
    { value: 'zh-Hans', label: '中文' },
    { value: 'en-US', label: 'English' },
];

const propTypes = {
    lang: PropTypes.string,
    dispatch: PropTypes.func,
};

export function mapState2Props (store) {
    const { locales } = store.app || {};
    return {
        lang: locales.lang
    };
}


export class PureSettings extends Component {

    static propTypes = propTypes;

    constructor (props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    }

    @bind
    handleLangChange (value) {
        this.logger.log(value);
        this.props.dispatch( AppActions.switchLang(value) );
    }

    @bind
    handleSubmit () {

        const { oldPassword, newPassword, confirmPassword } = this.state;
        const params = {};

        if (!oldPassword) {
            Message.error('Please Input Old Password');
            return;
        }

        if (!newPassword) {
            Message.error('Please Input New Password');
            return;
        }

        if (newPassword !== confirmPassword || !newPassword) {
            Message.error('Confirm Password do not math!');
            return;
        }

        params.newer = newPassword;
        params.origin = oldPassword;

        services.authPassword(params).then((res) => {
            this.logger.log(res);
            Message.success('Change Password Success!');
            this.setState({
                newPassword: '',
                oldPassword: '',
                confirmPassword: ''
            })
        }).catch((e) => {
            Message.error(e.message);
        })
    }

    @bind
    handleKeyPress (e) {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    @bind
    handlePwdChange (e, id) {
        this.setState({
            [id]: e.target.value
        })
    }

    renderLang () {
        return (
            <div className="c-form c-form-group">
                <legend className="s-setcommon__root">Language Change</legend>
                <span className="s-setcommon__item">
                    <Select.Simple
                        name="form-field-name"
                        value={this.props.lang}
                        clearable={false}
                        options={LanguageOptions}
                        onChange={this.handleLangChange}
                    />
                </span>

            </div>
        );
    }

    render() {
        const { oldPassword, newPassword, confirmPassword } = this.state;
        return (
            <Container className="s-settings">
                <Container.Body>
                    <div className="c-form  c-form-group">
                        <legend className="s-setscy__root">Change Password</legend>
                        <div className="s-setscy__line">
                            <label htmlFor="oldPassword">Old Password  &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <Input id="oldPassword" type="password" placeholder="Old Password" className="s-setscy__input s-query__item" value={oldPassword} onChange={this.handlePwdChange} />
                        </div>
                        <div className="s-setscy__line">
                            <label htmlFor="newPassword">New Password &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <Input id="newPassword" type="password" placeholder="New Password" className=" s-setscy__input s-query__item" value={newPassword} onChange={this.handlePwdChange} />
                        </div>
                        <div className="s-setscy__line">
                            <label htmlFor="confirmPassword">Confirm Password  &nbsp; &nbsp;</label>
                            <Input id="confirmPassword" type="password" placeholder="Confirm New Password" className="s-setscy__input s-query__item" value={confirmPassword} onChange={this.handlePwdChange} onKeyPress={this.handleKeyPress} />
                        </div>
                        <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
                    </div>
                    
                </Container.Body>
            </Container>
        );
    }
}

export default connect(mapState2Props)(containerInject(PureSettings))