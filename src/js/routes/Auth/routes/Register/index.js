import React from 'react';
import loadable from 'jscom/utils/loadable';

export default {
    name: 'Register',
    path: '/auth/register',
    component: loadable({
        loader: () => import(/* webpackChunkName: "Register" */'./containers/Register'),
        render (loaded, props, store) {
            const LoadedComponent = loaded.default;
            return <LoadedComponent {...props} />;
        }
    })
};
