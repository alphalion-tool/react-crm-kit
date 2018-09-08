
import { readJson } from '../util';

export function summaryBasic (req, res, next) {
    return res.json(readJson('summary/basic.json'));
}

export function summaryWithdraw (req, res, next) {
    return res.json(readJson('summary/withdraw.json'));
}

export function summaryVolume (req, res, next) {
    return res.json(readJson('summary/volume.json'));
}

const controls = [
    { path: '/api/summary', fn: summaryBasic },
    { path: '/api/summary/withdraw', fn: summaryWithdraw },
    { path: '/api/summary/volume', fn: summaryVolume }
];

export default controls;