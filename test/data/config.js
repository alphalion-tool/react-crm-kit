/* eslint-disable  import/no-unresolved, import/extensions, no-console, prefer-template */

const path  = require('path');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const readConfig = require('read-config');

const jsonPath = path.resolve(__dirname, './json');
const mock = new MockAdapter(axios);
const WHITESPACE = '     ';

export function readJson (fileName) {
    return readConfig(path.resolve(jsonPath, fileName));
}

function consoleReq (config, fileName) {
    console.log(WHITESPACE, config.method.blue, '\t', config.url.green, '\t', '[proxy]'.yellow, '\t[file]'.blue, fileName.yellow);
}

const SpecUrls = [
    [/\/company\/info\/\d+/, 'company/info/{companyId}.json'],
    [/\/company\/info\/\d+/, 'company/info/{companyId}.json', 'post'],  // post方法
];


export function createMock () {
    // Match ALL requests

    SpecUrls.forEach((item) => {
        // 针对post/get做普通的监听
        switch (item[2]) {
            case 'post':
                mock.onPost(item[0]).reply(config => { consoleReq(config, item[1]); return [200, readJson(item[1])]; });
                break;
            default:
                mock.onGet(item[0]).reply((config) => {
                    consoleReq(config, item[1]);
                    return [200, readJson(item[1])];
                });
                break;
        }
    });

    mock.onAny().reply(config => {
        const fileName = config.url.replace('/', '').split('?')[0] + '.json';
        consoleReq(config, fileName);
        return [200, readJson(fileName)];
    });
}

mock.createMock = createMock;
mock.readJson = readJson;

export default mock;