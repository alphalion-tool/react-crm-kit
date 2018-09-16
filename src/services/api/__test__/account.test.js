/* eslint-disable max-len, no-template-curly-in-string */

import accountService from '../account';

describe('services/account', () => {

    it('api', () => {
        expect(JSON.stringify(accountService)).toEqual(
            '{"accountQuery":{"url":"/api/accounts","method":"get"}}'
        );
    })

});