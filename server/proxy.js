/* eslint-disable no-console, dot-notation, import/prefer-default-export */

import express from 'express';
import path from 'path';
import lodash from 'lodash';
import readConfig from 'read-config';
import Url from 'url';
import httpProxyMiddle from 'http-proxy-middleware';
import proxy from 'express-http-proxy';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import { getConfig } from './config';

const appPath = path.join(__dirname, '');
const templatePath = path.join(appPath, './templates');

// API proxy
function proxyAPI(isHttps, proxyServer, proxyPath) {
    return proxy(proxyServer, {
        https: isHttps,
        secure: false,
        proxyReqPathResolver: function (req) {
            const curPath = Url.parse(req.url).path;
            if (!proxyPath) return curPath;
            return path.join(proxyPath, curPath);
        },
        filter: function (req, res) {
            const tmpPath = req.path || req.originalUrl,
                method = req.method;
            if (tmpPath.startsWith('/static/')) {
                return false;
            }
            if (tmpPath === '/' && method === 'GET') {
                return false;
            }

            console.log(method, '\t', req.originalUrl.green, '\t', '[proxy]'.yellow);
            return true;
        },
        reqBodyEncoding: null
    });
}

// index请求特殊处理
// 在mock的时候，请求"/"， 会转换为POST请求发送
function proxyIndex(isHttps, proxyServer, proxyPath) {
    return proxy(proxyServer, {
        https: isHttps,
        secure: false,
        proxyReqOptDecorator: function (proxyReq, originalReq) {
            // 在mock的时候，请求"/"， 会转换为POST请求发送
            proxyReq.headers['Content-Type'] = 'application/json';
            proxyReq.headers['Accept'] = 'application/json, */*';
            proxyReq.method = 'POST';
            return proxyReq;
        },
        proxyReqPathResolver: function (req) {
            const curPath = Url.parse(req.url).path;
            if (!proxyPath) return curPath;
            return path.join(proxyPath, curPath);
        },
        userResDecorator: function (rsp, data, req, res) {
            return new Promise((resolve) => {
                let params = {};
                try {
                    params = JSON.parse(data.toString('utf-8'));
                } catch (error) {
                    console.error(error);
                    params = {
                        data: {
                            permission: {},
                            isLoggedIn: false,
                            user: {}
                        }
                    }
                }
                const body = params.data;
                const dataObject = lodash.merge({}, {
                    permission: JSON.stringify(body.permission),
                    login: body.isLoggedIn,
                    user: JSON.stringify(body.user)
                });
                res.set('Content-Type', 'text/html');
                res.render('index.pug', dataObject, (err, html) => {
                    if (err) {
                        resolve(`error: ${err.message}`);
                    } else {
                        resolve(html);
                    }
                });

            })
        }
    });
}


// cross domain
function crossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

// log request
function log(req, res, next) {
    if (req.path !== '/' && !req.path.startsWith('/static/')) {
        if (next) next();
        return;
    }
    console.log(req.method, '\t', req.originalUrl.green);
    if (next) next();
}

// get websocket proxy instance
function wsProxyInstance (isHttps, proxyServer, wsPath = '/ws') {
    return httpProxyMiddle(wsPath, {
        target: isHttps ? `https://${proxyServer}` : `http://${proxyServer}`,
        changeOrigin: true,
        ws: true,
        logLevel: 'error',
        secure: false,
        onProxyReqWs: function (proxyReq, req, res) {
            console.log('WS', '\t', req.url.green, '\t', '[proxy]'.yellow);
        },
        onOpen: function (proxySocket) {
            proxySocket.on('data', (chunk) => {
                console.log('WS', '\t', wsPath.green, '\t', '[proxy]'.yellow);
            })
        }
    });
}

// mock-helper, please use please use https://github.com/alphalion-tool/mock-helper plugins
function mockHelperPlugin (req, res, next) {
    if (req.headers['__mock__datafrom__']) {
        if (req.headers['__mock__datafrom__'] === 'filesystem') {
            // from filesystem
    
            const tmpFilePath = path.join(req.headers['__mock__fileroot__'], req.headers['__mock__filename__']);
            console.log(req.method, '\t', req.originalUrl.green, '\t', '[file]'.yellow, tmpFilePath);
            try {
                const json = readConfig(tmpFilePath);
                res.json(json);
            } catch (e) {
                console.log(e);
                res.json({ code: 4, data: `${tmpFilePath} NOT EXIST!!!!!` });
            }
            
        } else {
            // from mock server
            const url = path.join(req.headers['__mock__server__'], req.originalUrl);
            console.log(req.method, '\t', req.originalUrl.green, '\t', '[proxy]'.yellow, url);
            axios.request({
                baseURL: req.headers['__mock__server__'],
                url: req.originalUrl, // url,
                method: req.method,
            }).then((response) => {
                res.json(response.data);
            }).catch( (e) => {
                console.log(e);
            })
        }
    } else {
        next();
    }
}

// env = 'production' | 'development'
export function proxyMiddleware(app, env) {

    const staticPath = env === 'production' ? path.join(appPath, '../build/static/') : path.join(appPath, '../dist/static/');

    const appConfig = getConfig(env);
    const useProxy = appConfig.useProxy;  // proxy flag
    const proxyServerConfig = appConfig.proxyServer;
    const isHttps = appConfig.isHttps;

    const proxyServerDomain = `${proxyServerConfig.host}:${proxyServerConfig.port}`;
    const proxyServerPath = proxyServerConfig.path || '';

    app.set('views', templatePath);
    app.set('view engine', 'pug');
    app.use(cookieParser());

    app.use(log);
    // static file
    app.use('/static', express.static(staticPath));

    // support websocket proxy
    if (useProxy) app.use(wsProxyInstance(isHttps, proxyServerDomain, '/ws'));

    // 首页的特殊处理
    if (useProxy) app.get('/', proxyIndex(isHttps, proxyServerDomain, proxyServerPath));

    // mock-helper, please use please use https://github.com/alphalion-tool/mock-helper plugins
    app.use('/', mockHelperPlugin);

    // for other route
    if (useProxy) app.use('/', proxyAPI(isHttps, proxyServerDomain, proxyServerPath));
    else {
        const controllerHub = require('./controller/').controllerHub;
        controllerHub(app);
    }

    app.use((err, req, res, next) => {
        if (err) {
            if (err.code && err.msg) {
                return res.json(err);
            }
            console.log('Error'.red, '\t', err.message.red);
            return res.end(`error: ${err.message}`);
        }
        return next();
    });

}
