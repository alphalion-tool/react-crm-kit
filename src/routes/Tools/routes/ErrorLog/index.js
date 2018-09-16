import React from 'react';
import loadable from 'jscom/utils/loadable';
import { injectReducer } from 'jscom/store/reducers';
import ErrorBoundary from 'jscom/components/app/ErrorBoundary';

export default {
    name: 'Error Log',
    path: '/tools/errorlog',
    component: loadable({
        loader: () => import(/* webpackChunkName: "ErrorLog" */'./containers/ErrorLog'),
        render(loaded, props, store) {
            const LoadedComponent = loaded.default;
            return <ErrorBoundary><LoadedComponent {...props} /></ErrorBoundary>;
        }
    })
};

