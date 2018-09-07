/* eslint-disable max-len, no-template-curly-in-string */

import accountService from '../account';

describe('services/account', () => {

    it('api', () => {
        expect(JSON.stringify(accountService)).toEqual(
            '{"accountAdd":{"url":"/account2/add","method":"post"},"accountInfo":{"url":"/account2/info/${accountId}","method":"get"},"accountInfoPost":{"url":"/account2/info/${accountId}","method":"post"},"accountQuery":{"url":"/account2/query","method":"get"},"accountSuggest":{"url":"/account2/suggest","method":"get"},"accountSynonym":{"url":"/account2/synonym","method":"get"},"accountRollup":{"url":"/account2/rollup"},"accountPosting":{"url":"/account2/posting"},"accountForexQuery":{"url":"/fxaccount/query","method":"get"},"accountForexAdd":{"url":"/fxaccount/add","method":"post"},"accountForexInfo":{"url":"/fxaccount/details/${accountId}","method":"get"},"accountForexInfoPost":{"url":"/fxaccount/edit/${accountId}","method":"post"},"fxAccountSuggest":{"url":"/fxaccount/suggest","method":"get"},"fxAccountFilterGroupSuggest":{"url":"/fxaccount/group/suggest","method":"get"},"fxAccountQuery":{"url":"/fxaccount/name/${accountIds}","method":"get"}}'
        );
    })

});