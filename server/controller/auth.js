
import mongoose from 'mongoose';
import * as codes from '../constants/code';
import { readJson } from '../util';

const User = mongoose.model('User');

export function authLogin (req, res, next) {
    const userName = req.body.name,
        password = req.body.pswd;

    User.load(({ conditions: { userName: 'admin1' } }), (err, user) => {
        if (err) {
            res.json({ code: codes.DB_ERROR, msg: err.message });
            return;
        }
        if (!user || !user.authenticate()) {
            res.json({ code: codes.LOGIN_FAILED, msg: 'not exist' });
            return;
        }
        res.cookie('uid', user.userId);
        res.cookie('token', user.hashedPassword);
        res.json({ code: codes.SUCCESS, data: user });

    })
    // return res.json(readJson('auth/login.json'));
}

export function authLogout (req, res, next) {
    res.cookie('uid', '');
    res.cookie('token', '');
    return res.json(readJson('auth/logout.json'));
}

const controls = [
    {
        method: 'post',
        path: '/api/auth/login',
        fn: authLogin
    },
    {
        method: 'post',
        path: '/api/auth/logout',
        fn: authLogout
    }
];
export default controls;