/* eslint-disable  no-console */

import axios from 'axios';
import path from 'path';
import readConfig from 'read-config';
import colors from 'colors';
import mockConfig from './config';

var appConfig = readConfig( path.join(__dirname, '../../webpack-dev-server/config.json') );

mockConfig.createMock();
// }

process.on('uncaughtException', (err) => {
    console.error('Error:', err);
});

export default mockConfig;
