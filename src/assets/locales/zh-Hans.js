'use strict';

import appLocaleData from 'react-intl/locale-data/zh';
import { addLocaleData } from 'react-intl';
import messages from './zh';

addLocaleData([...appLocaleData]);

const msgMap = {};
Object.keys(messages).forEach((i) => {
    msgMap[i] = { id: i, value: messages[i] };
});

window.appZHLocale = {
    messages,
    locale: 'zh-Hans',
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