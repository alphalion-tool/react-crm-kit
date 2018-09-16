/* @flow */
/* eslint-disable react/no-multi-comp */

import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import QueryRow from './QueryRow';
import QueryItem from './QueryItem';
import QueryFieldSet from './QueryFieldSet';
import stylePropType from 'react-style-proptype';
import { Icon, Tag } from 'antd';
import './style/index.scss';

type BlockProps = {
    children?: React$Element<any> | string,
    /* 是否支持折叠 */
    supportCollapse?: bool,
    /* 是否折叠 */
    isCollapse?: bool,

    /* 展开按钮的text */
    expandLabelText?: string | React$Element<any>,
    /* 折叠按钮的text */
    collapseLabelText?: string | React$Element<any>,

    onCollapse?: () => void,

    collapseBlock?: React$Element<any> | string,
    style?: stylePropType
};

class QueryBlockControl extends PureComponent {
    props: {
        children?: React$Element<any> | string,
        className?: string,
    };
    render () {
        return (
            <div className={classNames('c-query__control', this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

// 折叠按钮
class QueryBlockCollapseBtn extends PureComponent {
    props: {
        children?: React$Element<any> | string,
        onClick?: (e: any) => void
     };

    render () {
        return (
            <div className="c-query__collapse-btn" onClick={this.props.onClick}>{this.props.children}</div>
        );
    }
}

// 折叠后的内容块
class QueryBlockCollapseBlock extends PureComponent {
    props: {
        children?: React$Element<any> | string,
    };

    render () {
        return <div className="c-query__collapse__block">{this.props.children}</div>;
    }
}

// 高级块
class AdvancedBtn extends PureComponent {
    props: {
        isOpen?: bool,
        onClick?: (e: any) => void
     };

    render () {
        const { onClick, isOpen } = this.props;
        return (
            <div className={classNames('c-query__advanced__btn', isOpen ? 'c-query__advanced__btn--open' : '')} onClick={onClick}>
                {isOpen ? 'Close Advanced Search' : 'Open Advanced Search'}
                <Icon type="menu-down" />
            </div>
        );
    }
}

// 折叠后的内容块
class AdvancedBlock extends PureComponent {
    props: {
        children?: React$Element<any> | string,
        hidden?: bool, // 是否隐藏
    };

    render () {
        const { children, hidden } = this.props;
        return <div className={classNames('c-query__advanced__block', hidden ? 'c-query__advanced__block--hidden' : '')}>{this.props.children}</div>;
    }
}

export default class QueryBlock extends Component {

    props: BlockProps;
    static Row: typeof QueryRow = QueryRow;
    static Item: typeof QueryItem = QueryItem;
    static FieldSet: typeof QueryFieldSet = QueryFieldSet;
    static Tag: typeof Tag = Tag;
    static Control: typeof QueryItem = QueryItem; // QueryBlockControl = QueryBlockControl;
    static AdvancedBlock: typeof AdvancedBlock = AdvancedBlock;
    static AdvancedBtn: typeof AdvancedBtn = AdvancedBtn;

    static defaultProps: {
        expandLabelText: string | React$Element<any>,
        collapseLabelText: string | React$Element<any>
    } = {
        expandLabelText: <Icon type="triangle-bottom" />,
        collapseLabelText: <Icon type="triangle-top" />
    };

    state: {
        collapseFlag: bool,
    } = {
        collapseFlag: !!this.props.isCollapse
    };

    componentWillReceiveProps (nextProps: BlockProps) {
        if (nextProps.isCollapse !== this.props.isCollapse) {
            this.setState({ collapseFlag: nextProps.isCollapse });
        }
    }

    handleCollapse = () => {
        if (!('isCollapse' in this.props)) {
            this.setState({
                collapseFlag: !this.state.collapseFlag
            });
        }
        this.props.onCollapse && this.props.onCollapse();
    }

    render () {
        const { children, supportCollapse, collapseLabelText, expandLabelText, collapseBlock, onCollapse, isCollapse, ...otherProps } = this.props;
        const { collapseFlag } = this.state;
        return (
            <div {...otherProps} className={classNames('c-query', { 'c-query--collapse': collapseFlag })}>
                {children}
                {supportCollapse ? <QueryBlockCollapseBtn onClick={this.handleCollapse}>{!collapseFlag ? collapseLabelText : expandLabelText}</QueryBlockCollapseBtn> : null}
                {supportCollapse && collapseFlag ? <QueryBlockCollapseBlock>{collapseBlock}</QueryBlockCollapseBlock> : null }
            </div>
        );
    }

}