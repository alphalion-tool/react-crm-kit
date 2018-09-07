import React from 'react';
// import { mount as enzymeMount, shallow as enzymeShallow } from 'enzyme';
import { contextTypes as permissionContextTypes, mockPermission } from './permission';
import { Provider } from 'react-redux';
import { intlShape } from 'react-intl';
import mockIntl, { nodeWithIntlProp, intlProvider } from './intl';

const enzyme = require('./enzyme_setup');

export const mount = enzyme.mount;
export const shallow = enzyme.shallow;

/* function mount(node) {
    const div = global.document.getElementById('karma-test-wrap');
    return enzymeMount(node, { attachTo: div });
} */

export function attachMount(node, div, { ...props }) {
    return mount(node, { ...props });
    // return mount(node, { ...props, attachTo: div });
}

export function attachShallow(node, div, { ...props }) {
    return shallow(node, { ...props });
    // return shallow(node, { ...props, attachTo: div });
}

export function attachPermissionMount(node, div, permissions) {
    return mount(node, {
        // attachTo: div,
        childContextTypes: permissionContextTypes,
        context: mockPermission(permissions)
    });
}

// 挂载需要的环境到node上，包括permission, context, childContextTypes
export function mountWithEnv(node, div, store) {
    const intl = intlProvider.getChildContext().intl;
    return mount(React.cloneElement(node, { intl, store }),
        {
            attachTo: div,
            childContextTypes: Object.assign({}, { intl: intlShape }, permissionContextTypes, Provider.childContextTypes),
            context: Object.assign({}, mockPermission(), { store }, { intl }),
        }
    )
}

export function mountEnv(node, store) {
    const intl = intlProvider.getChildContext().intl;
    return mount(React.cloneElement(node, { intl, store }),
        {
            childContextTypes: Object.assign({}, { intl: intlShape }, permissionContextTypes, Provider.childContextTypes),
            context: Object.assign({}, mockPermission(), { store }, { intl }),
        }
    )
}