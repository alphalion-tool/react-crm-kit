/* eslint-disable vars-on-top, no-console */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import ip from 'ip';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import colors from 'colors';
import fs from 'fs';
import { getConfig } from './config';
import moment from 'moment-timezone';
import { logMiddleware } from './middlewares/log';

moment.tz.setDefault('Asia/Shanghai');

// mongoose.set('debug', true);

process.on('uncaughtException', (err) => {
    console.error('Error:', err);
});
// get command argv
const args = process.argv.slice(2);
const env = args.indexOf('online') === -1 ? 'development' : 'production';
const appConfig = getConfig(env);
const listenPort = appConfig.port;


const modelPath = path.join(__dirname, 'models');
fs.readdirSync(modelPath).forEach(file => require(path.join(modelPath, file))); // eslint-disable-line

function listen (app) {
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
}

function connect() {
    var options = {
        useNewUrlParser: true
    };
    return mongoose.connect(appConfig.db, options);
}

const app = express();
const hubController = require('./controller/').hubController;
const authMiddleware = require('./middlewares/auth').authMiddleware;

const staticPath = path.join(__dirname, '../build/static');
const templatePath = path.join(__dirname, '../build/templates');

const MongoStore = connectMongo(session);

app.set('views', templatePath);
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'bitbal',
    store: new MongoStore({
        url: appConfig.db,
        collection: 'sessions'
    })
}));

app.use(logMiddleware(env));

// static file
app.use('/static', express.static(staticPath));

// auth check
app.use(authMiddleware);
// hub all routes
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

// listen port after db connect success
connect().then(() => {
    console.log('db access success');
    listen(app);
}, err => {
    console.log(err)
    connect();
});