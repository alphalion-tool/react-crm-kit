/* eslint-disable import/prefer-default-export */

import path from 'path';
import fs from 'fs';
import FileStreamRotator from 'file-stream-rotator';
import morgan from 'morgan';
import winston from 'winston';


import { getConfig } from '../config';

// env is 'development' 'production'
export function logMiddleware (env) {

    const appConfig = getConfig(env);

    const logDir = path.join(__dirname, '../', appConfig.log);

    fs.existsSync(logDir) || fs.mkdirSync(logDir);
    const accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: `${logDir}/access-%DATE%.log`,
        frequency: 'daily',
        verbose: false
    });

    if (env === 'production') {
        morgan.token('cookie', function(req, res) {
            return JSON.stringify(req.cookies);
        });
        const logFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":cookie"';
        return morgan(logFormat, {
            stream: accessLogStream
        });
    } else {
        const logger = winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.Console(),
            ]
        });

        return morgan({
            stream: {
                write: message => logger.info(message)
            }
        });
    }

}