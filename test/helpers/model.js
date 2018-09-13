/* eslint-disable import/prefer-default-export */

import UserModel from 'jscom/schemas/UserSchema';

import {
    getUserInfo,
} from 'jstest/helpers/store-info';


export function getUserModel () {
    return UserModel.fromAPI(getUserInfo());
}
