import { readJson } from 'jstest/data/config';
import { startCase } from 'jscom/utils/lodash';

const userJson = readJson('user/list.json').data;

export function usersForStore() {
    if (!userJson) return false;
    const data = userJson;
    const userOptions = data.data.map((item) => { return { label: startCase(item.userName.toLowerCase()), key: item.userId, value: item.userName } });
    const users = data;
    return {
        users,
        userOptions,
        userStatus: 'done',
    };
}



const cacheStore = {
    cache: {
        ...usersForStore(),
    }
};

export function getCacheStore() {
    return cacheStore;
}