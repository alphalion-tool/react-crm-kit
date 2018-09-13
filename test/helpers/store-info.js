/* eslint-disable import/prefer-default-export */

import { readJson } from 'jstest/data/config';

export function getUserInfo () {
    return readJson('user/info/{userId}.json').data;
}