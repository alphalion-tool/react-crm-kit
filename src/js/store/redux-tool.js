'use strict';

import zipObject from 'lodash/array/zipObject';
import mapValues from 'lodash/object/mapValues';
import map from 'lodash/collection/map';
import uniqueId from 'uniqueid';

const uniqueActionId = uniqueId('');

// 创建action，不通过action_type，每次自动产生action_type
export const createActions = (actionObj, prefix = 'unknown') => {
    const baseId = uniqueActionId();
    return zipObject(map(actionObj, (actionCreator, key) => {
        // console.log(actionCreator, key);
        const actionId = `${prefix}-${baseId}-${key}`;
        const method = (...args) => {
            const result = actionCreator(...args);
            return {
                type: actionId,
                payload: {
                    ...(result || {})
                }
            };
        };
        method._id = actionId;
        return [key, method];
    }));
};

// 获取createActions中产生的actionid
export const getActionIds = (actionCreators) => {
    return mapValues(actionCreators, (value, key) => {
        return value._id;
    });
};

// 替换redux的createReducers
export const createReducers = (initialState, handlers) => {
    return (state = initialState, action) => {
        // BLog.log(state, action);
        return handlers[action.type] ? handlers[action.type](state, action.payload || {}) : state;
    };
};
