/* eslint-disable */
import 'babel-polyfill';
import 'airbnb-browser-shims';
import 'module-alias/register';
import 'jstest/setup';
import logger from 'jscom/utils/logger';
global.BLog = window.BLog;
import 'jstest/data/axiosMock';
import 'jstest/appEnv';
