/* @flow */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as ScrollLink,
    Element as ScrollElement,
    Events as ScrollEvents,
    animateScroll as AnimateScroll,
    scrollSpy as ScrollSpy
} from 'react-scroll';
import { Timeline, Icon } from 'antd';

import './ScrollMenu.scss';

type MenuItem = {
    title: string,
    to?: string,
    key?: string,
    containerId: string
};

type ScrollMenuProps = {
    menus: Array<MenuItem>,
    className?: string,
    title: string,
    onSetActive?: () => void,
    onSetInactive?: () => void
};

export default class ScrollMenu extends PureComponent {

    props: ScrollMenuProps;

    state: {
        activeItem: string,
    } = {
        activeItem: this.props.menus[0].key || ''
    };

    handleSetActive = (key: string) => {
        this.setState({
            activeItem: key
        });
        this.props.onSetActive && this.props.onSetActive();
    }

    handleSetInactive = () => {
        this.props.onSetInactive && this.props.onSetInactive();
    }

    renderItem({ key, title, containerId }: MenuItem) {
        const props: {
            key?: string,
            dot: any,
            className?: string
        } = {
            key,
            dot: null
        };
        if (this.state.activeItem === key) {
            props.dot = <Icon type="minus" />;
            props.className = 's-content__scrollmenu--active';
        }
        return (
            <Timeline.Item {...props}>
                <ScrollLink
                    activeClass="s-content__scrollmenu--active"
                    className="s-content__scrollmenu__link"
                    to={key}
                    spy={true}
                    smooth={true}
                    duration={500}
                    onSetActive={this.handleSetActive}
                    containerId={containerId}
                >
                    {title}
                </ScrollLink>
            </Timeline.Item>
        );
    }

    render() {
        const { title, menus, className } = this.props;
        return (
            <div className={classNames('s-content__scrollmenu', className)}>
                <Timeline>
                    {menus.map((item) => this.renderItem({ key: item.key || item.to, title: item.title, containerId: item.containerId }))}
                </Timeline>
            </div>
        );
    }
}

function withScroll(target: Object) {
    const oldMount = target.prototype.componentDidMount;
    target.prototype.componentDidMount = function() {

        ScrollEvents.scrollEvent.register('begin', (to, element) => {
            // console.log('begin', to, element);
        });
        ScrollEvents.scrollEvent.register('end', (to, element) => {
            // console.log('end', to, element);
        });

        ScrollSpy.update();

        if (oldMount) oldMount.call(this);
    };

    const oldUnMount = target.prototype.componentWillUnmount;
    target.prototype.componentWillUnmount = function () {
        ScrollEvents.scrollEvent.remove('begin');
        ScrollEvents.scrollEvent.remove('end');
        if (oldUnMount) oldUnMount.call(this);
    }

    return target;
}

export {
    ScrollLink,
    ScrollElement,
    AnimateScroll,
    ScrollSpy,
    ScrollEvents,
    withScroll
};