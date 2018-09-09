'use strict';

import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import uniqueId from 'uniqueid';

const uniqueActionId = uniqueId('');

// 创建action，不通过action_type，每次自动产生action_type
export const createActions = (actionObj, prefix = 'unknown') => {
    const baseId = uniqueActionId();
    const actionArr = map(actionObj, (actionCreator, key) => {
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
    });
    const actions = [];
    actionArr.forEach((item) => {
        if (Array.isArray(item)) {
            actions[item[0]] = item[1];
        }
    });
    return actions;
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
