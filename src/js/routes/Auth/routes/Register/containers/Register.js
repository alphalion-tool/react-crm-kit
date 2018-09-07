'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Register extends PureComponent {

    static propTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.router.replace('/auth/login');
        }, 2000);
    }

    render() {
        return <div>You must be send mail to admin.</div>;
    }
}
