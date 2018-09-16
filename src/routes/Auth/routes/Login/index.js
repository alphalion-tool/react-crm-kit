import React from 'react';
import loadable from 'jscom/utils/loadable';

export function loginRoute(other = {}) {
    return {
        name: 'Login',
        path: '/auth/login',
        component: loadable({
            loader: () => import(/* webpackChunkName: "Login" */'./containers/Login'),
            render (loaded, props, store) {
                const LoadedComponent = loaded.default;
                return <LoadedComponent {...other} {...props} />;
            }
        }),
    };
}

const exportRoute = loginRoute();

export default exportRoute;