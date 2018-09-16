import React from 'react';
import loadable from 'jscom/utils/loadable';
import { injectReducer } from 'jscom/store/reducers';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'User Info',
    path: '/user/:userId',
    component: loadable({
        loader: () => import(/* webpackChunkName: "UserInfo" */'./containers/UserInfo'),
        render (loaded, props, store) {
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};

