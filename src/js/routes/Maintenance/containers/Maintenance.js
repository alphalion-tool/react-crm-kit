'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Maintenance extends PureComponent {

    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return this.props.children;
    }
}
