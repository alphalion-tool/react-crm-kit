/* @flow */

/* eslint-disable import/prefer-default-export */

import ReactDOM from 'react-dom';

/* 获取某个组件的size */
export function getComponentSize (component: React$Component<any, any, any>): { width: number, height: number } {

    const dom: any = ReactDOM.findDOMNode(component);

    if (!dom) {
        return {
            width: 0,
            height: 0
        };
    }

    return {
        width: dom.offsetWidth,
        height: dom.offsetHeight
    };
}