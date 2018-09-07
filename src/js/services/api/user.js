/* eslint-disable no-template-curly-in-string */

export default {
    userQuery: { url: '/users', method: 'get' },
    userAdd: { url: '/user/add', method: 'post' },
    userInfo: { url: '/user/info/${userId}', method: 'get' },
    userInfoPost: { url: '/user/info/${userId}', method: 'post' },
    userResetOtp: { url: '/user/reset/otp/${userId}', method: 'post' },
    userResetPswd: { url: '/user/reset/pswd/${userId}', method: 'post' }
};