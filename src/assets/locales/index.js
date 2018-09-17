/* eslint-disable import/default */
import React from 'react';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';

import localENData from './en-US';
import localZHData from './zh-Hans';


// 切换语言函数
export function switchLocale(lang) {
    switch (lang) {
        // case 'zh':
        // case 'zh-CN':
        // case 'zh-Hans':
        // case 'chinese':
        //     window.appLocaleData = window.appZHLocale;
        //     break;
        default:
            window.appLocaleData = window.appENLocale;
            break;
    }
    window.localeMessages = defineMessages(window.appLocaleData.dataObject);
    return window.appLocaleData;
}



export function intlInject(target) {

    target.prototype.intl = function(id) {
        try {
            const { formatMessage } = this.props.intl;
            return formatMessage(window.localeMessages[id]);
        } catch (e) {
            BLog.error(e);
            BLog.error(`You need check id '${id}' in locale '${this.props.intl.locale}'`);
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
            BLog.error(e);
            BLog.error(`You need check id '${id}' in locale '${this.props.intl.locale}'`);
            return id;
        }
    };
    return target;

}

export function intl (id) {
    return <FormattedMessage id={id} values={window.localeMessages} />;
}