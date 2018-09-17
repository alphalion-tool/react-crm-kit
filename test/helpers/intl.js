/* eslint-disable import/newline-after-import,no-use-before-define */
import React from 'react';
global.Intl = require('intl');
require('intl/locale-data/jsonp/en');
addLocaleData(require('react-intl/locale-data/en')); 
import { IntlProvider, intlShape, addLocaleData } from 'react-intl';
import { intl as intlMethod, intlMethodInject } from 'jscom/assets/locales/index';
import 'jscom/assets/locales/en-US';
const locales = window.appENLocale;


// console.log(locales);
export const intlProvider = new IntlProvider(locales, {});

const { intl } = intlProvider.getChildContext();

export function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

export default function mockIntl () {
    return intl;
}

export {
    intlMethod,
    intl as intlProp,
    intlMethodInject,
}