
import { readJson } from '../util';

export function logList (req, res, next) {
    return res.json(readJson('logs/list.json'));
}

export function logInfo (req, res, next) {
    return res.json(readJson('logs/info.json'));
}

const controls = [
    { path: '/api/logs', fn: logList },
    { path: '/api/log/:id', fn: logInfo },
];

export default controls;