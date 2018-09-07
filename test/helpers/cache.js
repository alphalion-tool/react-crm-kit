import { readJson } from 'jstest/data/config';
import { startCase } from 'jscom/utils/lodash';

import CompanyModel from 'jscom/schemas/CompanySchema';

const companyJson = readJson('company/query.json').data;
const userJson = readJson('user/query.json').data;

const companies = companyJson.map((item) => CompanyModel.fromAPI(item));

// 获取company，同时可以按照index获取
export function getCompanyQuery(index) {
    if (index !== undefined) return companyJson[index];
    return companyJson;
}

export function companyForStore(index) {
    if (index !== undefined) {
        return companies[index];
    }
    const companyOptions = companies.map((item) => CompanyModel.company2Option(item));
    return {
        companyStatus: 'done',
        companies,
        companyOptions,
    };
}

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
        ...companyForStore(),
        ...usersForStore(),
    }
};

export function getCacheStore() {
    return cacheStore;
}