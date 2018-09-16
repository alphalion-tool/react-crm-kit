/* eslint-disable no-template-curly-in-string */

export default {
    constCountry: { url: '/const/country', method: 'get' },
    constCurrency: { url: '/const/currency', method: 'get' },
    constJournalType: { url: '/const/journal/type', method: 'get' },
    constTree: { url: '/const/tree/${type}' },
    constAccount: { url: '/const/account/${type}' },
    constCommon: { url: '/const/common/${type}' },
    constSecurity: { url: '/const/security/${type}' },
};