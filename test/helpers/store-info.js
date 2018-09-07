

import { readJson } from 'jstest/data/config';

// 获取company info
export function getCompanyInfo () {
    return readJson('company/info/{companyId}.json').data;
}


export function getUserInfo () {
    return readJson('user/info/{userId}.json').data;
}