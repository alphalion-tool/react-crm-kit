/* eslint-disable no-console, dot-notation, import/prefer-default-export */

import express from 'express';
import path from 'path';
import lodash from 'lodash';
import Url from 'url';
import httpProxyMiddle from 'http-proxy-middleware';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';

const appPath = path.join(__dirname, '');
const templatePath = path.join(appPath, './templates');

// API proxy
function proxyAPI({ isHttps, domain, pathname }) {
    return proxy(domain, {
        https: isHttps,
        secure: false,
        proxyReqPathResolver: function (req) {
            const curPath = Url.parse(req.url).path;
            if (!pathname) return curPath;
            return path.join(pathname, curPath);
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
function proxyIndex({ isHttps, domain, pathname }) {
    return proxy(domain, {
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
            if (!pathname) return curPath;
            return path.join(pathname, curPath);
        },
        userResDecorator: function (rsp, data, req, res) {
            return new Promise((resolve) => {
                let params = {};
                try {
                    params = JSON.parse(data.toString('utf-8'));
                } catch (error) {
                    console.error(error);
                    params = { data: { isLoggedIn: false, user: {} } };
                }
                const body = params.data;
                const dataObject = lodash.merge({}, {
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
function wsProxyInstance ({ isHttps, domain, pathname, wsPathname }) {
    console.log(isHttps, domain);
    return httpProxyMiddle(wsPathname, {
        target: isHttps ? `https://${domain}` : `http://${domain}`,
        changeOrigin: true,
        ws: true,
        logLevel: 'error',
        secure: false,
        onProxyReqWs: function (proxyReq, req, res) {
            console.log('WS', '\t', req.url.green, '\t', '[proxy]'.yellow);
        },
        onOpen: function (proxySocket) {
            proxySocket.on('data', (chunk) => {
                console.log('WS', '\t', wsPathname.green, '\t', '[proxy]'.yellow);
            })
        }
    });
}

// config = { port: 123, proxyServer: { ... } }
export function proxyMiddleware(app, appConfig) {

    const staticPath = path.join(appPath, '../dist/static'); // env === 'production' ? path.join(appPath, '../build/static/') : path.join(appPath, '../dist/static/');

    const proxyServerConfig = appConfig.proxyServer;

    app.set('views', templatePath);
    app.set('view engine', 'pug');
    app.use(cookieParser());

    app.use(log);
    // static file
    app.use('/static', express.static(staticPath));

    // support websocket proxy
    app.use(wsProxyInstance(proxyServerConfig));

    // 首页的特殊处理
    app.get('/', proxyIndex(proxyServerConfig));

    // for other route
    app.use('/', proxyAPI(proxyServerConfig));

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
