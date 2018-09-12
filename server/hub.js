/* eslint-disable no-console, import/prefer-default-export */

import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Shanghai');

// mongoose.set('debug', true);

// hub db
export function hubDB (config, callback) {
    // read models from models dir
    const modelPath = path.join(__dirname, 'models');
    fs.readdirSync(modelPath).forEach(file => require(path.join(modelPath, file))); // eslint-disable-line

    function connect() {
        var options = {
            // server: {
            //     socketOptions: {
            //         keepAlive: 1
            //     }
            // },
            useNewUrlParser: true
        };
        return mongoose.connect(config.db, options);
    }

    connect().then(() => {
        console.log('db access success');
        callback();
    }, err => {
        console.log(err)
        connect();
    });
}
