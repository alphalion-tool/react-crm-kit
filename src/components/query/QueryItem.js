/* @flow */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import stylePropType from 'react-style-proptype';

type ItemProps = {
    /* 标签 */
    label?: React$Element<any> | string,
    labelClassName?: string,
    children?: React$Element<any> | string,
    className?: string,
    style?: stylePropType,
    /* 只有标签 */
    onlyLabel?: bool
};

export default class QueryItem extends PureComponent {

    props: ItemProps;

    render () {
        const { label, children, labelClassName, className, onlyLabel, ...otherProps } = this.props;
        let labelContent = typeof label === 'string' ? <label className={labelClassName}>{label}</label> : label;
        return (
            <div {...otherProps} className={classNames('c-query__item', onlyLabel ? 'c-query__item--onlylabel' : '', className)}>
                {labelContent}
                {children}
            </div> 
        );
    }

}