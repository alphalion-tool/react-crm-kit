/* eslint-disable import/prefer-default-export */

import accountControls from './account';
import authControls from './auth';
import userControls from './user';
import indexControls from './indexController';
import orderControls from './order';
import logsControls from './logs';
import summaryControls from './summary';
import transControls from './trans';
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
    ...transControls,
    ...summaryControls,
    ...userControls,
    ...orderControls
];

export function hubController (app) {
    routes.forEach((route) => {
        const method = route.method || 'get';
        const type = route.type || 'interface'; // for param or interface
        // is param
        if (type === 'param') {
            app.param(route.name, route.fn);
            return;
        }
        if (method === 'get') {
            app.get(route.path, route.fn);
        }
        if (method === 'post') {
            app.post(route.path, route.fn);
        }
    });
    return app;
}