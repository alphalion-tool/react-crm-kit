import React from 'react';
import loadable from 'jscom/utils/loadable';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'Settings',
    path: '/settings/security',
    component: loadable({
        loader: () => import(/* webpackChunkName: "Settings" */'./containers/Settings'),
        render (loaded, props, store) {
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};


