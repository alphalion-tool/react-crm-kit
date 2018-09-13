import configureMockStore from 'redux-mock-store';
import promise from 'jscom/store/promiseMiddleware';
import { readJson } from 'jstest/data/config';

const middlewares = [promise];
const mockStore = configureMockStore(middlewares);


const userQueryJson = readJson('user/list.json').data.data;
const accountQueryJson = readJson('account/list.json').data.data;

export function getUserQuery(index) {
    if (index !== undefined) return userQueryJson[index];
    return userQueryJson;
}

export function getAccountQuery (index) {
    if (index !== undefined) return accountQueryJson[index];
    return accountQueryJson;
}


export {
    mockStore as default
}
