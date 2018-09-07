
import { readJson } from '../util';

export function depositList (req, res, next) {
    return res.json(readJson('deposit/list.json'));
}

export function depositInfo (req, res, next) {
    return res.json(readJson('deposit/info.json'));
}

const controls = [
    { path: '/api/deposits', fn: depositList },
    { path: '/api/deposit/:id', fn: depositInfo },
];

export default controls;