/* @flow */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import stylePropType from 'react-style-proptype';

type RowProps = {
    className?: string,
    children?: React$Element<any> | string,
    /* 遮罩是否打开 */
    maskVisible?: bool,
    style?: stylePropType
};

export default class QueryRow extends PureComponent {

    props: RowProps;

    render () {
        const { className, children, maskVisible, ...otherProps } = this.props;
        return (
            <div {...otherProps} className={classNames('c-query__line', className)}>
                {children}
                {maskVisible && <div className="c-query__opt__mask" />}
            </div>
        );
    }

}