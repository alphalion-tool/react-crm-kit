/* eslint-disable import/newline-after-import,no-use-before-define */
import React from 'react';
global.Intl = require('intl');
require('intl/locale-data/jsonp/en');
addLocaleData(require('react-intl/locale-data/en')); 
import { IntlProvider, intlShape, addLocaleData } from 'react-intl';
import { mount, shallow, render } from 'enzyme';
import { intl as intlMethod, intlMethodInject } from 'appcom/locales/index';
import { contextTypes as permissionContextTypes, mockPermission } from './permission';
import 'appcom/locales/en-US';
const locales = window.appENLocale;


// console.log(locales);
export const intlProvider = new IntlProvider(locales, {});

const { intl } = intlProvider.getChildContext();

export function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, { context, ...props } = {}) {
    return shallow(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, { intl }),
            ...props
        }
    );
}

export function mountWithIntl(node, { context, childContextTypes, ...props } = {}) {
    return mount(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, { intl }),
            childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
            ...props
        }
    );
}

export function mountPermissionWithIntl(node, { context, childContextTypes, ...props } = {}) {
    return mount(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, { intl }, mockPermission()),
            childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes, permissionContextTypes ),
            ...props
        }
    );
}

export default function mockIntl () {
    return intl;
}

export {
    intlMethod,
    intl as intlProp,
    intlMethodInject,
}