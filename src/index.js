'use strict';

/* eslint-disable import/newline-after-import */

import React from 'react';
import ReactDOM from 'react-dom';
import 'jscom/polyfills';
import './style/index.scss';
import logger from 'jscom/utils/logger';

import { ReduxProvider, IntlProvider } from 'jscom/components/app/provider';

import { HashRouter, Route } from 'react-router-dom';

import store from 'jscom/store/store';
import AuthActions from 'jscom/actions/auth';
import App from './containers/App';

window.__DATA__ = {};

store.dispatch(AuthActions.switchAuth(window.__data));

function render(Component) {
    ReactDOM.render(
        <ReduxProvider store={store}>
            <IntlProvider>
                <HashRouter>
                    <Route path="/" component={Component} />
                </HashRouter>
            </IntlProvider>
        </ReduxProvider>,
        document.getElementById('wrap'),
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        // eslint-disable-next-line
        const NextApp = require('./containers/App').default;
        render(NextApp);
        console.log('app update'); // eslint-disable-line 
    });
}
