const webpack = require('webpack');
const path = require('path');
const library = '[name]_lib';
const vendors = [
    'react', 'lodash', 'moment',
    'immutable', 'prop-types', 'react-dom', 
    'react-intl', 'react-redux', 'react-router',
    'classnames', 'axios', 'antd',
    'redux', 'react-cookie', 'decko', 'memoized-decorator'
];

module.exports = {
    entry: {
        vendors: vendors
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dll/'),
        library
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll/[name]-manifest.json'),
            // This must match the output.library option above
            name: library
        }),
        // remove moment locale files
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(de|pl)$/),
    ],
}