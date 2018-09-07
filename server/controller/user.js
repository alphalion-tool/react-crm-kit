
import { readJson } from '../util';

export function userList (req, res, next) {
    return res.json(readJson('user/list.json'));
}

export function userInfo (req, res, next) {
    return res.json(readJson('user/info.json'));
}

export function userAdd (req, res, next) {
    return res.json(readJson('user/add.json'));
}


const controls = [
    { path: '/api/users', fn: userList },
    { path: '/api/user/:id', fn: userInfo },
    { path: '/api/user/add', fn: userAdd, method: 'post' },
];

export default controls;