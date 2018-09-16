
import React from 'react';
import loadable from 'jscom/utils/loadable';
import { injectReducer } from 'jscom/store/reducers';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'Help',
    path: '/help',
    component: loadable({
        loader: () => import(/* webpackChunkName: "Help" */'./containers/Help'),
        render (loaded, props, store) {
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};

