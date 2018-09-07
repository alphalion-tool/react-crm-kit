
import authService from '../auth';

describe('services/auth', () => {

    it('api', () => {
        expect(JSON.stringify(authService)).toEqual(
            '{"authLogin":{"url":"/auth/login","method":"post"},"authLogout":{"url":"/auth/logout","method":"get"},"authLogoutPost":{"url":"/auth/logout","method":"post"},"authPassword":{"url":"/auth/password","method":"post"}}'
        );
    })

});