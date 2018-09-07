
import { readJson } from '../util';

export function authLogin (req, res, next) {
    res.cookie('token', 'token');
    return res.json(readJson('auth/login.json'));
}

export function authLogout (req, res, next) {
    res.cookie('token', '');
    return res.json(readJson('auth/logout.json'));
}

const controls = [
    {
        method: 'post',
        path: '/api/auth/login',
        fn: authLogin,
    },
    {
        method: 'post',
        path: '/api/auth/logout',
        fn: authLogout
    }
];
export default controls;