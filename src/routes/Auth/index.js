import React from 'react';
import loadable from 'jscom/utils/loadable';

export default {
    name: 'Login',
    path: '/auth/',
    component: loadable({
        loader: () => import(/* webpackChunkName: "Auth" */'./containers/Auth'),
        render (loaded, props, store) {
            const LoadedComponent = loaded.default;
            return <LoadedComponent {...props} />;
        }
    }),
};

