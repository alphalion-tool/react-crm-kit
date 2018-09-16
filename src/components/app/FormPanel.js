/* eslint-disable react/no-multi-comp */

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollMenu, { ScrollElement } from './ScrollMenu';
import { Form } from 'antd';

import './FormPanel.scss';


class FormPanelControl extends PureComponent {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
    };

    render () {
        const { children, className } = this.props;
        return (
            <div className={classNames('s-formpanel__control', className)}>
                {children}
            </div>
        );
    }
}

/* 内容区域的每一列 */
class FormPanelContentCol extends PureComponent {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
    };

    render () {
        const { children, className } = this.props;
        return (
            <div className={classNames('s-formpanel__contentcol', className)}>
                {children}
            </div>
        );
    }
}

/* panel内容区域 */
class FormPanelContent extends PureComponent {

    static Col: typeof FormPanelContentCol = FormPanelContentCol;
    static propTypes = {
        mode: PropTypes.string,
        children: PropTypes.node,
        className: PropTypes.string,
    };

    render () {
        const { children, className, mode } = this.props;
        return (
            <div className={classNames('s-formpanel__content', className, { 's-formpanel__content--horizontal': mode === 'horizontal' })}>
                {children}
            </div>
        );
    }
}

/* 可滚动区域的容器 */
/* istanbul ignore next */
class FormPanelScrollContainer extends PureComponent {

    static propTypes = {
        className: PropTypes.string,
    };

    /* istanbul ignore next */
    render () {
        const { className, ...otherProps } = this.props;
        return <ScrollElement {...otherProps} className={classNames('s-formpanel__scrollcontainer', className)} />;
    }
}

/* 可滚动区域的每个单独内容的title */
/* istanbul ignore next */
class FormPanelScrollCardTitle extends PureComponent {

    static propTypes = {
        className: PropTypes.string,
    };

    /* istanbul ignore next */
    render () {
        const { className, ...otherProps } = this.props;
        return <div {...otherProps} className={classNames('s-formpanel__panel-title', className)} />;
    }
}

/* 可滚动区域的每个单独的内容 */
/* istanbul ignore next */
class FormPanelScrollCard extends PureComponent {

    static Title = FormPanelScrollCardTitle;
    static propTypes = {
        className: PropTypes.string,
    };

     // istanbul ignore next 
    render () {
        const { className, ...otherProps } = this.props;
        return <ScrollElement {...otherProps} className={classNames('s-formpanel__panel', className)} />;
    }
}

const P = ({ children, className }) => {  // eslint-disable-line react/prop-types
    const type = typeof children;
    if (type === 'undefined' || children === null) return <div />;
    return <div className={className}>{children}</div>;
}

export default class FormPanel extends PureComponent {

    static Control = FormPanelControl;
    static Content = FormPanelContent;
    static ScrollContainer = FormPanelScrollContainer;
    static ScrollCard = FormPanelScrollCard;
    static P = P;

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        editable: PropTypes.bool
    };

    render () {
        const { children, className, editable = false } = this.props;
        return (
            <div className={classNames('s-formpanel', { 's-formpanel--editable': !editable }, className)}>
                {children}
            </div>
        );
    }
}

export function withForm({ mapPropsToFields, onFiledsChange, onValuesChange, ...otherProps } = {}) {
    return (Comp) => Form.create({ mapPropsToFields, onFiledsChange, onValuesChange, ...otherProps })(Comp);
}

