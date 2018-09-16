import React from 'react';
import loadable from 'jscom/utils/loadable';
import { injectReducer } from 'jscom/store/reducers';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'Accounts',
    path: '/accounts',
    component: loadable({
        loader: () => import(/* webpackChunkName: "AccountList" */'./containers/AccountList'),
        render (loaded, props, store) {
            const reducer = require('./modules/reducer').default;
            injectReducer(store, { key: 'accountList', reducer });
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};

