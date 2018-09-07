/* eslint-disable import/prefer-default-export */

import accountControls from './account';
import authControls from './auth';
import userControls from './user';
import indexControls from './indexController';
import orderControls from './order';
import logsControls from './logs';
import walletControls from './wallet';
import withdrawControls from './withdraw';
import depositControls from './deposit';

const routes = [
    ...indexControls,
    ...depositControls,
    ...authControls,
    ...withdrawControls,
    ...walletControls,
    ...logsControls,
    ...accountControls,
    ...userControls,
    ...orderControls
];

export function controllerHub (app) {
    routes.forEach((route) => {
        const method = route.method || 'get';
        app[method.toLowerCase()](route.path, route.fn);
    });
    return app;
}