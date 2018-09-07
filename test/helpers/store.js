import configureMockStore from 'redux-mock-store';
import promise from 'jscom/store/promiseMiddleware';
import { readJson } from 'jstest/data/config';

import {
    getCompanyQuery,
    companyForStore,
} from './cache';

import {
    getCompanyInfo,
} from './store-info';

const middlewares = [promise];
const mockStore = configureMockStore(middlewares);


const userQueryJson = readJson('user/query.json').data.data;



export function getUserQuery(index) {
    if (index !== undefined) return userQueryJson[index];
    return userQueryJson;
}



export {
    companyForStore,
    getCompanyInfo,
    getCompanyQuery,
    mockStore as default
}
