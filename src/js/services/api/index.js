/* eslint-disable object-property-newline */

import account from './account';
import auth from './auth';
import consts from './const';
import deposit from './deposit';
import javascript from './javascript';
import order from './order';
import user from './user';
import wallet from './wallet';
import withdraw from './withdraw';

const alls = {
    ...account, ...auth,
    ...consts,
    ...deposit,
    ...javascript,
    ...order,
    ...user,
    ...wallet, ...withdraw
};

export default alls;