/* @flow */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import stylePropType from 'react-style-proptype';

type FieldSetProps = {
    className?: string,
    children?: React$Element<any> | string,
    legend?: React$Element<any> | string,
    style?: stylePropType,
    maskVisible?: bool,
    /* 模式，支持行内模式 */
    mode?: 'inline' | 'vertical-inline'
};

export default class QueryFieldSet extends PureComponent {

    props: FieldSetProps;

    render () {
        const { legend, children, className, maskVisible, mode, ...otherProps } = this.props;
        const cls = classNames('c-query__fieldset', {
            [`c-query__fieldset--${mode || ''}`]: mode,
        }, className);
        return (
            <div {...otherProps} className={cls}>
                {legend && <div className="c-query__fieldset__legend">{legend}</div>}
                <div className="c-query__fieldset__child">{children}</div>
                {maskVisible && <div className="c-query__fieldset__mask" />}
            </div>
        );
    }

}