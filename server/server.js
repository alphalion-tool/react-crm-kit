/* eslint-disable vars-on-top, no-console */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import ip from 'ip';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import { getConfig } from './config';
import { hubDB } from './hub';
import { hubController } from './controller/';

process.on('uncaughtException', (err) => {
    console.error('Error:', err);
});

// get command argv
const args = process.argv.slice(2);
const env = args.indexOf('online') === -1 ? 'development' : 'production';
const appConfig = getConfig(env);
const listenPort = appConfig.port;

const app = express();

hubDB(appConfig, () => {

    const staticPath = path.join(__dirname, '../build/static');
    const templatePath = path.join(__dirname, '../build/templates');

    app.set('views', templatePath);
    app.set('view engine', 'pug');
    app.use(cookieParser());

    // static file
    app.use('/static', express.static(staticPath));
    
    hubController(app);

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

    app.listen(listenPort, '0.0.0.0', () => {

        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
        if (env === 'production') {
            console.log(`---------this is in ${env.toUpperCase()} status--------------`.red);
        }
        console.log('You can change config(host or port) in file: ', 'server/config/[dev|prod]config.json or server/config/local.[dev|prod].config.json'.green);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('You can access the web in your browser NOW!!'.green);
        console.log(`Open http://localhost:${listenPort}`.green);
    });
});
