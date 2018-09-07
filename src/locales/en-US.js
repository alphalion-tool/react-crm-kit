'use strict';

import appLocaleData from 'react-intl/locale-data/en';
// import messages from './en-US.messages';
import messages from './en';
import { keys, assign } from 'jscom/utils/lodash';

const _message = {};
keys(messages).forEach((i) => {
    _message[i] = { id: i, value: messages[i] };
});

window.appENLocale = {

    messages: assign({}, messages),

    locale: 'en-US',

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