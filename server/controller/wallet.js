
import { readJson } from '../util';

export function walletList (req, res, next) {
    return res.json(readJson('wallet/list.json'));
}

export function walletInfo (req, res, next) {
    return res.json(readJson('wallet/info.json'));
}

const controls = [
    { path: '/api/wallets', fn: walletList },
    { path: '/api/wallet/:id', fn: walletInfo },
];

export default controls;