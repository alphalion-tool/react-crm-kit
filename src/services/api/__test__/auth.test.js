
import authService from '../auth';

describe('services/auth', () => {

    it('api', () => {
        expect(JSON.stringify(authService)).toEqual(
            '{"authLogin":{"url":"/api/auth/login","method":"post"},"authLogoutPost":{"url":"/api/auth/logout","method":"post"},"authPassword":{"url":"/auth/password","method":"post"}}'
        );
    })

});