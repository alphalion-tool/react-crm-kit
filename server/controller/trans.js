
import { readJson } from '../util';

export function transList (req, res, next) {
    return res.json(readJson('trans/list.json'));
}

export function transInfo (req, res, next) {
    return res.json(readJson('trans/info.json'));
}

const controls = [
    { path: '/api/trans', fn: transList },
    { path: '/api/tran/:id', fn: transInfo },
];

export default controls;