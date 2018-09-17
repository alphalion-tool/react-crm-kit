'use strict';

/* eslint-disable import/newline-after-import */

import React from 'react';
import ReactDOM from 'react-dom';
import 'jscom/polyfills';
import './assets/style/index.scss';
import logger from 'jscom/utils/logger';
import browserHistory from 'jscom/utils/history';

import { ReduxProvider, IntlProvider } from 'jscom/components/app/provider';

import { Router, Route } from 'react-router-dom';

import store from 'jscom/store/store';
import AuthActions from 'jscom/actions/auth';
import App from './containers/App';


window.__DATA__ = {};

store.dispatch(AuthActions.switchAuth(window.__data));

function render(Component) {
    ReactDOM.render(
        <ReduxProvider store={store}>
            <IntlProvider>
                <Router history={browserHistory}>
                    <Route path="/" component={Component} />
                </Router>
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
