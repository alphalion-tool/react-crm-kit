'use strict';

/* @flow */

import React, { PureComponent } from 'react';

type propTypes = {
    children?: React$Element<any>
};

export default class Tools extends PureComponent {

    props: propTypes;

    render() {
        return this.props.children;
    }
}