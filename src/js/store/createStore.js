
import { applyMiddleware, compose, createStore as createStoreRdx } from 'redux';

import { makeRootReducer } from './reducers';
import { updateLocation } from './location';
import promise from './promiseMiddleware';

export function createStore (initialState = {}) {

    // middleware dev
    // const middleware = [promise];

    // middleware online
    const middleware = [promise];

    // store enhancers
    const enhancers = [];
    if (window.__DEV__) {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    const store = createStoreRdx(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').makeRootReducer;
            // console.log(nextRootReducer);
            store.replaceReducer(nextRootReducer());
        });
    }

    store.asyncReducers = {};

    // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
    // store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

    return store;
}

export default createStore();
