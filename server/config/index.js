// 选择是否从local中读取配置
/* eslint-disable import/prefer-default-export */

import path from 'path';
import readConfig from 'read-config';
import fs from 'fs';

const configPath = path.join(__dirname, '');

// env = 'development' | 'production'
export function getConfig (env) {
    let localFilePath = './local.dev.config.json',
        filePath = './dev.config.json';

    switch (env) {
        case 'production':
            filePath = './prod.config.json';
            localFilePath = './local.prod.config.json';
            break;
        default:
            break;
    }
    let configFilePath = path.join(configPath, localFilePath);
    if (!fs.existsSync(configFilePath)) {
        configFilePath = path.join(configPath, filePath);
    }
    return readConfig(configFilePath);
}