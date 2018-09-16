import React from 'react';
import loadable from 'jscom/utils/loadable';
import { injectReducer } from 'jscom/store/reducers';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'Deposits',
    path: '/deposits',
    component: loadable({
        loader: () => import(/* webpackChunkName: "DepositList" */'./containers/DepositList'),
        render (loaded, props, store) {
            const reducer = require('./modules/reducer').default;
            injectReducer(store, { key: 'depositList', reducer });
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};

