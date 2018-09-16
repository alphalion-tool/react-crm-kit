/* eslint-disable no-template-curly-in-string */

export default {
    userQuery: { url: '/api/users', method: 'get' },
    userAdd: { url: '/api/user/add', method: 'post' },
    userInfo: { url: '/api/user/info/${userId}', method: 'get' },
    userInfoPost: { url: '/api/user/info/${userId}', method: 'post' },
    userResetOtp: { url: '/api/user/reset/otp/${userId}', method: 'post' },
    userResetPswd: { url: '/api/user/reset/pswd/${userId}', method: 'post' }
};