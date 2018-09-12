
import mongoose from 'mongoose';
import * as codes from '../constants/code';

const User = mongoose.model('User');

// auth middleware
export function authMiddleware (req, res, next) {
    const uid = req.cookies.uid,
        token = req.cookies.token;

    req.isAuthenticated = function () {
        return !!(req.authUser && req.authUser.userId && req.authUser.hashedPassword === token);
    }

    User.load({ conditions: { userId: uid } }, (err, user) => {
        if (user) req.authUser = user;
        next(err);
    })
}

export function requiresLogin (req, res, next) {
    if (!req.isAuthenticated()) {
        res.json({ code: codes.NEED_LOGIN, msg: 'need login' });
        return;
    }
    next();
}