'use strict';

import appLocaleData from 'react-intl/locale-data/en';
import { addLocaleData } from 'react-intl';
import messages from './en';

addLocaleData([...appLocaleData]);

const msgMap = {};

Object.keys(messages).forEach(key => {
    msgMap[key] = { id: key, value: messages[key] };
});

window.appENLocale = {
    messages,
    locale: 'en-US',
    data: appLocaleData,
    dataObject: msgMap,
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