
import mongoose from 'mongoose';
import wrap from 'co-express';
import * as codes from '../constants/code';
import { readJson } from '../util';

const User = mongoose.model('User');

const load = wrap(function* (req, res, next, userId) {
    const user = yield User.load({ conditions: { userId: Number(userId) } });
    req.user = user;
    if (!req.user) next({ code: codes.NOT_FOUND, msg: 'User not found' });
    else next();
});

const userList = wrap(function* (req, res) {
    // return res.json(readJson('user/list.json'));
    const count = yield User.countDocuments();
    const users = yield User.list({ page: req.query.page, size: req.query.size });
    res.json({ code: codes.SUCCESS, data: { count, data: users } });
});


const userInfo = (req, res, next) => {
    // return res.json(readJson('user/info.json'));
    return res.json({ code: codes.SUCCESS, data: req.user });
}

const userAdd = wrap(function* (req, res, next) {
    // return res.json(readJson('user/add.json'));
    const newId = yield User.newUserId();
    let user = new User({
        userId: newId,
        userName: `admin${newId}`,
        password: '123456',
        email: `admin${newId}@bitbal.top`,
        firstName: `${newId}`,
        lastName: `${newId}`,
        phone: `123444${newId}`
    });
    try {
        user = yield user.save();
        return res.json({ code: codes.SUCCESS, data: user });
    } catch (e) {
        return res.json({ code: codes.PARAM_ERROR, msg: e.message });
    }
});


const controls = [
    { type: 'param', name: 'userId', fn: load },
    { path: '/api/users', fn: userList },
    { path: '/api/user/add', fn: userAdd, method: 'get' },
    { path: '/api/user/:userId', fn: userInfo }
];

export default controls;