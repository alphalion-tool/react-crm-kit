import mongoose from 'mongoose';
import wrap from 'co-express';
import * as codes from '../constants/code';
import { readJson } from '../util';

const Order = mongoose.model('Order');

const load = wrap(function* (req, res, next, id) {
    const order = yield Order.load({ conditions: { orderId: Number(id) } });
    req.order = order;
    if (!req.order) next({ code: codes.NOT_FOUND, msg: 'Order not found' });
    else next();
});

const orderList = wrap(function* (req, res) {
    // return res.json(readJson('order/list.json'));
    const count = yield Order.countDocuments();
    const orders = yield Order.list({ page: req.query.page, size: req.query.size });
    res.json({ code: codes.SUCCESS, data: { count, data: orders } });
});

function orderInfo (req, res, next) {
    // return res.json(readJson('order/info.json'));
    return res.json({ code: codes.SUCCESS, data: req.order });
}

const orderAdd = wrap(function* (req, res, next) {
    // return res.json(readJson('order/add.json'));
    const newId = yield Order.newOrderId();
    let order = new Order({
        orderId: newId,
        side: 'buy',
        quantity: Math.random() * 10000,
        dealQuantity: Math.random() * 10000,
        accountId: 1,
        orderType: 'limit',
        price: 12312.00,
        currencyPair: 'btc-usdt'
    });
    try {
        order = yield order.save();
        return res.json({ code: codes.SUCCESS, data: order });
    } catch (e) {
        return res.json({ code: codes.PARAM_ERROR, msg: e.message });
    }
});


const controls = [
    { type: 'param', name: 'orderId', fn: load },
    { path: '/api/orders', fn: orderList },
    { path: '/api/order/add', fn: orderAdd },
    { path: '/api/order/:orderId', fn: orderInfo },

];

export default controls;