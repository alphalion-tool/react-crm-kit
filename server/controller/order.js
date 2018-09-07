
import { readJson } from '../util';

export function orderList (req, res, next) {
    return res.json(readJson('order/list.json'));
}

export function orderInfo (req, res, next) {
    return res.json(readJson('order/info.json'));
}

const controls = [
    { path: '/api/orders', fn: orderList },
    { path: '/api/order/:id', fn: orderInfo },
];

export default controls;