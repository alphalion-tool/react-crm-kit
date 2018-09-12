/* eslint-disable vars-on-top, no-console */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import ip from 'ip';
import express from 'express';
import colors from 'colors';
import webpackConfig from '../webpack.config';
import { stats as webpackStats } from '../webpack.common';
import { proxyMiddleware } from './proxy';
import { getConfig } from './config';
import { hubDB } from './hub';


process.on('uncaughtException', (err) => {
    console.error('Error:', err);
});

let server = null;
// get command argv
const args = process.argv.slice(2);
const env = args.indexOf('online') === -1 ? 'development' : 'production';
const appConfig = getConfig(env);
const listenPort = appConfig.port;
let compiler = null;


function listen(curServer) {
    curServer.listen(listenPort, '0.0.0.0', () => {

        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
        if (env === 'production') {
            console.log(`---------this is in ${env.toUpperCase()} status--------------`.red);
        }
        
        console.log('DEV Server: \t\t', `http://localhost:${listenPort}`.green);
        if (appConfig.useProxy) {
            const serverUrl = `${appConfig.proxyServer.host}:${appConfig.proxyServer.port}`;
            console.log('API Server: \t\t', serverUrl.green);
        }
        console.log('You can change config(host or port) in file: ', 'server/config/[dev|prod]config.json or server/config/local.[dev|prod].config.json'.green);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
        if (env === 'production') {
            console.log('You can access the web in your browser NOW!!'.green);
        }
    });
}

if (env === 'production') {
    // for production
    server = express();
    hubDB(appConfig, () => {
        proxyMiddleware(server, 'production');
        listen(server);
    });
} else {
    // for development
    webpackConfig.entry.index.unshift('webpack/hot/only-dev-server',
        `webpack-dev-server/client?http://localhost:${listenPort}`,
        `webpack-dev-server/client?http://${ip.address()}:${listenPort}`
    );

    compiler = webpack(webpackConfig);
    hubDB(appConfig, () => {
        server = new WebpackDevServer(compiler, {

            contentBase: webpackConfig.output.path,
            hot: true,
            historyApiFallback: false,
            // compress: true,
            // use custom express middleware
            before: function(app) {
                proxyMiddleware(app, 'development');
            },

            clientLogLevel: 'warning', // error, warning, none
            quiet: false,
            // noInfo: true,
            lazy: false,
            filename: webpackConfig.output.filename,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            publicPath: webpackConfig.output.publicPath,
            stats: webpackStats
        });
        listen(server);
    });
}

