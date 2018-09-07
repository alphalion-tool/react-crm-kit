/* eslint-disable import/prefer-default-export */

import path from 'path';
import readConfig from 'read-config';

const jsonPath = path.resolve(__dirname, './mockdata');

export function readJson (fileName) {
    return readConfig(path.resolve(jsonPath, fileName));
}
