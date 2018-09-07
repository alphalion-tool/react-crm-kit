// for test
// 
var webpack             = require('webpack');
var path                = require('path');
var readConfig          = require('read-config');

var staticRoot          = path.join(__dirname, 'dist/static/');

var webpackConfig = require('./webpack.common.js')(staticRoot);

// webpackConfig.cache = false;
webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.DefinePlugin({
        'typeof window': JSON.stringify("object")
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('test'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'test/common.js',
        minChunks: function ({ resource }) {
            return resource &&
                    resource.indexOf('node_modules') >= 0 &&
                    resource.match(/\.js$/);
        }
    })
]);

webpackConfig.externals = {
    // 'cheerio': 'window',
    // 'jsdom': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};

delete webpackConfig.entry;
// delete webpackConfig.output;
// console.log(webpackConfig.output);

webpackConfig.devtool = 'cheap-module-source-map';

module.exports = webpackConfig;