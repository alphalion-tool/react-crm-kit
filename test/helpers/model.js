
import CompanyModel from 'jscom/schemas/CompanySchema';
import UserModel from 'jscom/schemas/UserSchema';

import {
    getCompanyInfo,
    getUserInfo,
} from 'jstest/helpers/store-info';


export function getCompanyModel () {
    return CompanyModel.fromAPI(getCompanyInfo());
}

export function getUserModel () {
    return UserModel.fromAPI(getUserInfo());
}
