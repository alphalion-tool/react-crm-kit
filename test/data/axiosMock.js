/* eslint-disable  no-console */

import axios from 'axios';
import path from 'path';
import readConfig from 'read-config';
import httpProxy from 'http-proxy';
import colors from 'colors';
import express from 'express';
import mockConfig from './config';

var appConfig = readConfig( path.join(__dirname, '../../mock/config.json') );
var serverConfig = appConfig.testServer;
var serverUrl = `${serverConfig.host}:${serverConfig.port}`;

// if (process.env.NODE_ENV === 'test' && process.env.TEST_PORT) {
    // axios.defaults.baseURL = `http://127.0.0.1:${process.env.TEST_PORT}`;
mockConfig.createMock();
// }

process.on('uncaughtException', (err) => {
    console.error('Error:', err);
});

export default mockConfig;
