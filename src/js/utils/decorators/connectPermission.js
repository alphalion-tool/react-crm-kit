/* @flow */
/* eslint-disable react/no-multi-comp */
/** connect permit */

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import hoistNonReactStatic from 'hoist-non-react-statics';

export type permitContextTypes = {
    permission: Object,
    checkPermission: (module?: string, operations?: string | Array<string>) => bool
};

export const permissionContextTypes = {
    permission: PropTypes.object,
    checkPermission: PropTypes.func
};

/* 校验permission的方法封装器 */
export function checkPermissionWrapper(permits: Object): (module?: string, operations?: string | Array<string>) => bool {
    const permissionMap = {};
    Object.keys(permits).forEach((module) => {
        // 模块开始的时候为true
        let modulePermit = true;
        Object.keys(permits[module]).forEach((op) => {
            let permit = permits[module][op];
            permissionMap[`${module}:${op}`] = permit;
            if (modulePermit) modulePermit = permit;
        });
        permissionMap[`${module}:*`] = modulePermit;
    });
    return function (module?: string = '', operations?: string | Array<string> = '*') {
        if (!module && (operations === '*' || !operations)) return true;
        let actions = [];
        if (Array.isArray(operations)) {
            actions = operations.map((op) => {
                if (op.indexOf(':') !== -1) {
                    return op;
                }
                return `${module}:${op}`;
            });
        } else {
            actions = operations.indexOf(':') !== -1 ? [`${operations}`] : [`${module}:${operations}`];
        }

        return !actions.some((action) => !permissionMap[action]);
    }
}


function getDisplayName(WrappedComponent: any) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

type optionsTypes = {
    /* 模块，比如说trade */
    module: string,
    /* 操作，比如说'view', ['trade:view', 'trade:query'] */
    operations: Array<string> | string,
    failureComponent?: (any) =>?React$Element<any>,
    pure: bool
};

const defaultOptions = {
    /* 模块 */
    module: '',
    /* 操作 */
    operations: '*',
    failureComponent: (any) => null,
    pure: true
};

export default function connectPermission(options: optionsTypes = defaultOptions) {

    const { module, operations, failureComponent, pure } = options;

    return function wrapWithPermit(WrappedComponent: ReactClass<any>) {

        const displayName = `Permit(${getDisplayName(WrappedComponent)})`;

        class PermitComponent extends Component {

            haveOwnPropsChanged: bool;  // eslint-disable-line react/sort-comp
            static WrappedComponent: any = WrappedComponent;
            static OriginalComponent: any = WrappedComponent.OriginalComponent ?
                WrappedComponent.OriginalComponent :
                (WrappedComponent.WrappedComponent ? WrappedComponent.WrappedComponent : WrappedComponent);

            constructor(props, context) {
                super(props, context);

                this.haveOwnPropsChanged = true;
            }

            componentWillReceiveProps(nextProps, nextContext) {
                if (pure && (!shallowEqual(nextProps, this.props) || !shallowEqual(nextContext, this.context))) {
                    this.haveOwnPropsChanged = true;
                }
            }

            shouldComponentUpdate(nextProps, nextState, nextContext) {
                return this.haveOwnPropsChanged;
            }

            render() {
                if (pure) {
                    this.haveOwnPropsChanged = false;
                }

                const { checkPermission } = this.context;
                const hasPermission = checkPermission(module, operations);

                if (!hasPermission && failureComponent) {
                    return failureComponent(options);
                }

                return <WrappedComponent {...this.props} {...this.context} hasPermission={hasPermission} />;
            }
        }

        PermitComponent.displayName = displayName;
        PermitComponent.contextTypes = permissionContextTypes;

        return hoistNonReactStatic(PermitComponent, WrappedComponent);
    }

}

type WithPermissionProps = {
    module?: string,
    operations?: Array<string> | string,
    text?: React$Element<any>,
    children?: React$Element<any> | string,
};

/* Permission权限组件 */
export class WithPermission extends Component {

    props: WithPermissionProps;
    static contextTypes = permissionContextTypes;

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const { module, operations, text } = this.props;
        const { checkPermission } = this.context;
        const hasPermission = checkPermission(module, operations);

        if (!hasPermission) return text || null;

        return Children.only(this.props.children);
    }
}