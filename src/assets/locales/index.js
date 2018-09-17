/* eslint-disable import/default */
import React from 'react';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';

import localENData from './en-US';
import localZHData from './zh-Hans';

// switch locale function
export function switchLocale(lang) {
    switch (lang) {
        case 'zh-Hans':
            window.appLocaleData = window.appZHLocale;
            break;
        default:
            window.appLocaleData = window.appENLocale;
            break;
    }
    window.localeMessages = defineMessages(window.appLocaleData.dataObject);
    return window.appLocaleData;
}

// inject to component
export function intlInject(target) {

    target.prototype.intl = function(id) {
        try {
            const { formatMessage } = this.props.intl;
            return formatMessage(window.localeMessages[id]);
        } catch (e) {
            console && console.error && console.error(e); // eslint-disable-line
            console && console.error && console.error(`You need check id '${id}' in locale '${this.props.intl.locale}'`); // eslint-disable-line
            return id;
        }
    };
    const Comp = injectIntl(target);
    Comp.OriginalComponent = target.OriginalComponent ?
                target.OriginalComponent :
                (target.WrappedComponent ? target.WrappedComponent : target);
    return Comp;
}

export function intlMethodInject (target) {
    target.prototype.intl = function(id) {
        try {
            const { formatMessage } = this.props.intl;
            return formatMessage(window.localeMessages[id]);
        } catch (e) {
            console && console.error && console.error(e); // eslint-disable-line
            console && console.error && console.error(`You need check id '${id}' in locale '${this.props.intl.locale}'`); // eslint-disable-line
            return id;
        }
    };
    return target;

}

export function intl (id) {
    return <FormattedMessage id={id} values={window.localeMessages} />;
}