import React from 'react';
// import { mount as enzymeMount, shallow as enzymeShallow } from 'enzyme';
import { shape } from 'prop-types';
import { contextTypes as permissionContextTypes, mockPermission } from './permission';
import { Provider } from 'react-redux';
import { intlShape } from 'react-intl';
import mockIntl, { nodeWithIntlProp, intlProvider } from './intl';
import browserHistory from 'jscom/utils/history';

const enzyme = require('./enzyme_setup');

export const mount = enzyme.mount;
export const shallow = enzyme.shallow;

// Instantiate router context
const router = {
    history: browserHistory,
    route: {
        location: {},
        match: {},
    },
};


export function attachMount(node, div, { ...props }) {
    return mount(node, { ...props });
    // return mount(node, { ...props, attachTo: div });
}

export function attachShallow(node, div, { ...props }) {
    return shallow(node, { ...props });
    // return shallow(node, { ...props, attachTo: div });
}

// 挂载需要的环境到node上，包括permission, context, childContextTypes
export function mountWithEnv(node, div, store) {
    const intl = intlProvider.getChildContext().intl;
    return mount(React.cloneElement(node, { intl, store }),
        {
            attachTo: div,
            childContextTypes: Object.assign({}, { intl: intlShape }, { router: shape({}) }, permissionContextTypes, Provider.childContextTypes),
            context: Object.assign({}, mockPermission(), { store }, { intl }, { router }),
        }
    )
}

export function mountEnv(node, store) {
    const intl = intlProvider.getChildContext().intl;
    return mount(React.cloneElement(node, { intl, store }),
        {
            childContextTypes: Object.assign({}, { intl: intlShape }, { router: shape({}) }, permissionContextTypes, Provider.childContextTypes),
            context: Object.assign({}, mockPermission(), { store }, { intl }, { router }),
        }
    )
}