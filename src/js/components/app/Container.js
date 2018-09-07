/* @flow */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ContentNav from './ContentNav';
import ContentBody from './ContentBody';
import { Spin } from 'antd';
import './Container.scss';

type ContainerProps = {
    className?: string,
    children?: React$Element<any> | string,
    // 是否是spin状态
    spinning?: bool,
    innerRef?: (ref: any) => void
};

export default class Container extends PureComponent {

    props: ContainerProps;

    static Nav: typeof ContentNav = ContentNav;
    static Body: typeof ContentBody = ContentBody;

    render () {
        const { className, children, spinning, innerRef } = this.props;
        return (
            <div className={classNames('s-content-root', className)} ref={innerRef}>
                <Spin spinning={spinning || false}>
                    {children}
                </Spin>
            </div>
        );
    }
}