'use strict';

import { combineReducers } from 'redux';
import locationReducer from './location';
import { app, auth, cache } from '../reducers/';
import BLog from 'jscom/utils/logger';

// 构造reducer
export const makeRootReducer = (asyncReducers) => {
    // console.log("makeRootReducer===>", asyncReducers);
    return combineReducers({
        location: locationReducer,
        app,
        cache,
        auth,
        ...asyncReducers
    });
};

// 动态更新reducer
export const injectReducer = (store, { key, reducer }) => {

    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));

    BLog.log('store: ', key, ' done');

};

// export default makeRootReducer;
