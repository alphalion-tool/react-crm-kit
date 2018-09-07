'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import classNames from 'classnames';
import AuthActions from 'jscom/actions/auth';
import { containerInject } from 'jscom/utils/decorators';
import LocalStore from 'jscom/utils/storage';
import { Route } from 'react-router-dom';
import { loginRoute } from 'jscom/routes/Auth/routes/Login';
import Register from 'jscom/routes/Auth/routes/Register';

import './Auth.scss';

const propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    status: PropTypes.string,
    history: PropTypes.object,
    dispatch: PropTypes.func,
    authName: PropTypes.string,
    children: PropTypes.node,
};

function mapState2Props (store) {
    const { auth, app } = store;
    const { isLoggedIn, authMsg, authName, status } = auth;
    return {
        isLoggedIn, authMsg, status, authName
    };
}

class Auth extends Component { // eslint-disable-line

    static propTypes = propTypes;

    componentWillMount () {
        if (this.props.isLoggedIn) {
            this.gotoInner(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn) {
            this.gotoInner(nextProps);
            return;
        } else {
            LocalStore.setItem('authName', '');
        }
    }

    gotoInner (props) {
        LocalStore.setItem('authName', props.authName);
        this.props.history.push(LocalStore.getRedirectUrl(true));
    }

    @bind
    handleSignIn (name, pswd) {
        this.props.dispatch(AuthActions.login(name, pswd));
    }

    render() {
        return (
            <div className="s-content-root u-fixed--center p-auth s-content__background-image">
                <div className="s-content-login">
                    <div className="u-fixed--center__child">
                        <div className="s-auth">
                            <div className="s-auth__login-area">
                                <Route {...loginRoute({ onSignIn: this.handleSignIn })} />
                                <Route {...Register} />
                            </div>
                            <div className={classNames('u-loading', 's-auth--loading', { 'u-show': this.props.status === 'loading' })} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapState2Props)(containerInject(Auth));
