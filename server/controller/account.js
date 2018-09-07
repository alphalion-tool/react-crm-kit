
import { readJson } from '../util';

export function accountList (req, res, next) {
    return res.json(readJson('account/list.json'));
}

export function accountInfo (req, res, next) {
    return res.json(readJson('account/info.json'));
}

export function accountAdd (req, res, next) {
    return res.json(readJson('account/add.json'));
}

const controls = [
    { path: '/api/accounts', fn: accountList },
    { path: '/api/account/:id', fn: accountInfo },
    { path: '/api/account/add', fn: accountAdd, method: 'post' },
];

export default controls;