
import mongoose from 'mongoose';
import wrap from 'co-express';
import { readJson } from '../util';

const objectId = mongoose.Types.ObjectId;
const Deposit = mongoose.model('Deposit');

const load = wrap(function* (req, res, next, id) {
    const deposit = yield Deposit.load({ conditions: { depositId: Number(id) } });
    req.deposit = deposit;
    if (!req.deposit) next({ code: 1, msg: 'Deposit not found' });
    else next();
});

const depositList = wrap(function* (req, res) {
    // return res.json(readJson('deposit/list.json'));
    const count = yield Deposit.countDocuments();
    const data = yield Deposit.list({ page: req.query.page, size: req.query.size });
    res.json({ code: 0, data: { count: count, data } });
});

export function depositInfo (req, res, next) {
    // return res.json(readJson('deposit/info.json'));
    return res.json({ code: 0, data: req.deposit });
}

const depositAdd = wrap(function* (req, res) {
    const newId = yield Deposit.newDepositId();
    let ins = new Deposit({
        depositId: newId,
        status: 'Pending',
        accountId: 1,
        currency: 'btc',
        quantity: Math.random() * 10000,
        address: '1MFUPo2vRih3XkRDCiSzGiirQh2PXb8tkj'
    });
    try {
        ins = yield ins.save();
        return res.json({ code: 0, data: ins });
    } catch (e) {
        return res.json({ code: 1, msg: e.message });
    }
});



const controls = [
    { type: 'param', name: 'depositId', fn: load },
    { path: '/api/deposits', fn: depositList },
    { path: '/api/deposit/add', fn: depositAdd },
    { path: '/api/deposit/:depositId', fn: depositInfo },
];

export default controls;