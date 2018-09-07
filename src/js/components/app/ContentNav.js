/* eslint-disable react/no-multi-comp */

import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as windows from 'jscom/utils/window';

import './ContentNav.scss';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired
    ]),
    onSizeChangeCallback: PropTypes.func,
    onSizeChange: PropTypes.func,
    innerRef: PropTypes.func,
    // 是否在tab中隐藏，在其他情况中展示 （比如说correspondent是弹窗展示）
    hiddenInTab: PropTypes.bool,
};


export class NavTitle extends PureComponent {

    static propTypes = {
        children: PropTypes.node,
    };
    
    render () {
        return (
            <div className="s-content__title s-slide__nav">{this.props.children}</div>
        );
    }
}

export default class ContentNav extends Component {

    static propTypes = propTypes;

    static Title = NavTitle;

    isOpenWindow = windows.isOpenWindow(); // eslint-disable-line react/sort-comp

    constructor(props, context) {
        super(props, context);
        this.cls = classNames('s-content__nav', props.className ? props.className : null);
        this.mountFlag = false;
    }

    componentDidMount() {
        this.realTimeSize();
        this.mountFlag = true;
    }

    componentDidUpdate(prevProps, prevState) {
        this.realTimeSize();
    }

    componentWillReceiveProps (nextProps) {
        /* istanbul ignore else */
        if (nextProps.className !== this.props.className) {
            this.cls = classNames('s-content__nav', nextProps.className ? nextProps.className : null);
        }
    }

    refSet = (r) => {
        this.refbody = r;
    }

    // 实时设置宽度高度
    realTimeSize() {
        const oldWidth = this.offsetWidth;
        const oldHeight = this.offsetHeight;
        /* istanbul ignore if */
        if (this.refbody) {
            this.offsetHeight = this.refbody.offsetHeight;
            this.offsetWidth = this.refbody.offsetWidth;
        }

        if (!this.mountFlag) return;
        /* istanbul ignore if */
        if (this.offsetHeight !== oldHeight || this.offsetWidth !== oldWidth) {
            if (this.props.onSizeChangeCallback) this.props.onSizeChangeCallback();
            this.props.onSizeChange && this.props.onSizeChange();
        }
    }

    render() {
        const { innerRef, children, hiddenInTab } = this.props;
        // 针对弹出的窗口
        if (!this.isOpenWindow && hiddenInTab) return null;
        return (
            <div className={this.cls} ref={innerRef || this.refSet}>
                {children}
            </div>
        );
    }
}
