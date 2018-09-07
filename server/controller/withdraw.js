
import { readJson } from '../util';

export function withdrawList (req, res, next) {
    return res.json(readJson('withdraw/list.json'));
}

export function withdrawInfo (req, res, next) {
    return res.json(readJson('withdraw/info.json'));
}

const controls = [
    { path: '/api/withdraws', fn: withdrawList },
    { path: '/api/withdraw/:id', fn: withdrawInfo },
];

export default controls;