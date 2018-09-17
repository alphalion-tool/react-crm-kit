'use strict';

import appLocaleData from 'react-intl/locale-data/zh';
import { addLocaleData } from 'react-intl';
import { keys, assign } from 'jscom/utils/lodash';

addLocaleData([...appLocaleData]);

import messages from './zh';
// import messages from './zh-Hans.messages';

const _message = {};
keys(messages).forEach((i) => {
    _message[i] = { id: i, value: messages[i] };
});

window.appZHLocale = {

    messages: assign({}, messages),

    locale: 'zh-Hans',

    data: appLocaleData,

    dataObject: _message,

    formats: {
        date: {
            normal: {
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }
        }
    }
};