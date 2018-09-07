// for development
// 
var webpack = require('webpack');
var path = require('path');
var readConfig = require('read-config');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var staticRoot = path.join(__dirname, 'dist/static/');
var webpackConfig = require('./webpack.common.js')(staticRoot);
var HappyPack = require('happypack');


webpackConfig.plugins[5] = new HappyPack({
    id: 'jsx',
    threads: 4,
    loaders: ['react-hot-loader/webpack', 'babel-loader?cacheDirectory=true'],
});

webpackConfig.plugins = webpackConfig.plugins.concat([
    new CaseSensitivePathsPlugin({ debug: false }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
]);

webpackConfig.mode = 'development'; // devlopment mode

module.exports = webpackConfig;