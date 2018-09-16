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

// proxy api, about all routes, filter static
function proxyAPI({ isHttps, domain, pathname = '' }) {
    return proxy(domain, {
        https: isHttps,
        secure: false,
        filter: function (req, res) {
            const tmpPath = req.path || req.originalUrl,
                method = req.method;
            if (tmpPath.startsWith('/static/')) {
                return false;
            }
            console.log(method, '\t', req.originalUrl.green, '\t', '[proxy]'.yellow);
            return true;
        },

        proxyReqPathResolver: function (req) {
            const curPath = Url.parse(req.url).path;
            if (curPath.startsWith('/api')) {
                return path.join(pathname, curPath);
            } else {
                return '/';
            }            
        },

        proxyReqOptDecorator: function (proxyReq, originalReq) {
            // 在mock的时候，请求"/"， 会转换为POST请求发送
            if (proxyReq.path.startsWith('/api')) return proxyReq;

            proxyReq.headers['Content-Type'] = 'application/json';
            proxyReq.headers['Accept'] = 'application/json, */*';
            proxyReq.method = 'POST';
            return proxyReq;
        },

        userResDecorator: function (rsp, data, req, res) {

            if (req.originalUrl.startsWith('/api')) return data;

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

    // for all route
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
