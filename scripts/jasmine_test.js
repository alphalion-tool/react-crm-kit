/* eslint-disable */

require('babel-register')({
    plugins: ['css-modules-transform', ['transform-inline-environment-variables', {
            'include': [
                'NODE_ENV'
            ]
        }]
    ]
});

import Jasmine from 'jasmine';

let jasmine = new Jasmine();
// modify this line to point to your jasmine.json
jasmine.loadConfigFile('./jasmine.json');
jasmine.execute();