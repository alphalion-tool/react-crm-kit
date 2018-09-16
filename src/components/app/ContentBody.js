'use strict';

import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { loggerInject } from 'jscom/utils/decorators';

import './ContentBody.scss';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired
    ]),
    onSizeChangeCallback: PropTypes.func,
    innerRef: PropTypes.func,
};

export default class ContentBody extends Component {

    static propTypes = propTypes;

    constructor(props, context) {
        super(props, context);
        this.cls = classNames('s-content__body', props.className ? props.className : null);
    }

    componentDidMount() {
        this.realTimeSize();
        this.mountFlag = true;
    }

    componentDidUpdate() {
        this.realTimeSize();
    }

    refBodySet = (r) => {
        this.refBody = r;
    }

    realTimeSize() {
        const oldWidth = this.offsetWidth;
        const oldHeight = this.offsetHeight;
        if (!this.refBody) return;

        this.offsetHeight = this.refBody.offsetHeight;
        this.offsetWidth = this.refBody.offsetWidth;
        if (!this.mountFlag) return;
        /* istanbul ignore if */
        if (this.offsetHeight !== oldHeight || this.offsetWidth !== oldWidth) {
            this.props.onSizeChangeCallback && this.props.onSizeChangeCallback();
        }
    }

    render() {
        const { innerRef } = this.props;
        return (
            <div className={this.cls} ref={innerRef || this.refBodySet}>{this.props.children}</div>
        );
    }
}