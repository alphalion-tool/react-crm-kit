
import mongoose from 'mongoose';
import wrap from 'co-express';
import { requiresLogin } from '../middlewares/auth';
import * as codes from '../constants/code';
import { readJson } from '../util';

const Account = mongoose.model('Account');

const load = wrap(function* (req, res, next, accountId) {
    const account = yield Account.load({ conditions: { accountId: Number(accountId) } });
    req.account = account;
    if (!req.account) next({ code: codes.NOT_FOUND, msg: 'Account not found' });
    else next();
});

const accountList = wrap(function* (req, res) {
    // return res.json(readJson('account/list.json'));
    const count = yield Account.countDocuments();
    const accounts = yield Account.list({ page: req.query.page, size: req.query.size });
    res.json({ code: codes.SUCCESS, data: { count, data: accounts } });
});

const accountInfo = function (req, res) {
    // return res.json(readJson('account/info.json'));
    res.json({ code: codes.SUCCESS, data: req.account });
}

const accountAdd = wrap(function* (req, res) {
    // return res.json(readJson('account/add.json'));
    const newAccountId = yield Account.newAccountId();
    let account = new Account({
        accountId: newAccountId,
        accountName: `jack-${newAccountId}`,
        idType: 'idcard',
        idNumber: `${new Date().getTime()}`,
        email: `account-${newAccountId}@bitbal.top`,
    });
    try {
        account = yield account.save();
        return res.json({ code: codes.SUCCESS, data: account });
    } catch (e) {
        return res.json({ code: codes.PARAM_ERROR, msg: e.message });
    }
});


const controls = [
    { type: 'param', name: 'accountId', fn: load },
    { path: '/api/accounts', fn: [requiresLogin, accountList] },
    { path: '/api/account/add', fn: accountAdd, },
    { path: '/api/account/:accountId', fn: accountInfo },
];

export default controls;