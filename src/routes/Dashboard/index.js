import React from 'react';
import loadable from 'jscom/utils/loadable';
import { injectReducer } from 'jscom/store/reducers';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'Dashboard',
    path: '/dashboard',
    component: loadable({
        loader: () => import(/* webpackChunkName: "Dashboard" */'./containers/Dashboard'),
        render (loaded, props, store) {
            const reducer = require('./modules/reducer').default;
            injectReducer(store, { key: 'summary', reducer });
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};

