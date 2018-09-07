import React from 'react';
import loadable from 'jscom/utils/loadable';
import { injectReducer } from 'jscom/store/reducers';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'Users',
    path: '/users',
    component: loadable({
        loader: () => import(/* webpackChunkName: "UserList" */'./containers/UserList'),
        render (loaded, props, store) {
            const reducer = require('./modules/reducer').default;
            injectReducer(store, { key: 'userList', reducer });
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};

