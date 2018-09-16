
const stats = {
    children: false,
    colors: true,
    reasons: false,
    chunks: false,
    chunkModules: false,
    version: false,
    hash: false,
    timings: false,
};

module.exports = function (staticRoot) {

    var webpack = require('webpack');
    var path = require('path');
    var indexPath = __dirname;
    var pathRoot = path.join(__dirname, './src');
    var nodeModulesPath = path.join(__dirname, './node_modules');
    var vendors = require('./webpack.dll.config').entry.vendors;

    var FlowtypePlugin = require('./plugins/flow-babel-webpack-plugin');
    var RemoveStyleScriptChunksPlugin = require('./plugins/RemoveStyleScriptChunksPlugin');
    var ProgressBarPlugin = require('progress-bar-webpack-plugin');
    var HappyPack = require('happypack');
    var CopyWebpackPlugin = require('copy-webpack-plugin');
    var MiniCssExtractPlugin = require("mini-css-extract-plugin");

    var imagePath = path.join(pathRoot, '/assets/images');
    var jsTestPath = path.join(pathRoot, '../test');

    return (
        {
            context: pathRoot,
            entry: {
                index: ['appcom/index.js'],
            },
            output: {
                filename: '[name].js?[hash:8]',
                chunkFilename: '[name].[chunkhash:8].js',
                path: staticRoot,
                publicPath: '/static/'
            },
            resolve: {
                alias: {
                    jscom: pathRoot,
                    appcom: pathRoot,
                    imgcom: imagePath,
                    jstest: jsTestPath,
                },
                extensions: ['.js', '.jsx', '.json'],
            },
            module: {
                rules: [
                    { // 0
                        test: /\.s?[ac]ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'resolve-url-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    {  // 1
                        test: /\.(jpe?g|png|gif|svg)$/i,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    hash: "sha512",
                                    digest: "hex",
                                    name: "[path][name].[hash:8].[ext]"
                                }
                            },
                            {
                                loader: 'image-webpack-loader',
                            }
                        ]
                    },

                    {  // 2
                        test: /\.(eot|ttf|woff|woff2)$/,
                        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[hash:8].[ext]"
                    },

                    {  // 3
                        test: /\.(js|jsx)?$/,
                        exclude: [/node_modules/],
                        loaders: ['happypack/loader?id=jsx']
                    },
                ],
                noParse: [/jszip.js$/],
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                    chunkFilename: '[name].css',
                }),

                new RemoveStyleScriptChunksPlugin(),

                new CopyWebpackPlugin([{
                    from: '../dll/vendors.js',
                    to: staticRoot
                }]),
                new CopyWebpackPlugin([{
                    from: imagePath + '/logo/',
                    to: staticRoot + '/images/logo/',
                }]),
                new webpack.DllReferencePlugin({
                    context: __dirname,
                    manifest: require(path.join(__dirname, './dll/vendors-manifest.json')),
                }),
                new HappyPack({
                    id: 'jsx',
                    threads: 4,
                    loaders: ['babel-loader?cacheDirectory=true'],
                }),
                new FlowtypePlugin(),
                new ProgressBarPlugin(),
            ],
            optimization: {
                splitChunks: {
                    name: false,

                    cacheGroups: {
                        default: false,
                        vendors: false,
                        styles: {
                            name: 'main',
                            test: /\.s?[ac]ss$/,
                            chunks: 'all',
                            minChunks: 1,
                            reuseExistingChunk: true,
                            enforce: true
                        }
                    }

                },
            },
            node: {
                fs: false,
                Buffer: true
            },
            cache: true,
            // watchDelay: 0,
            devtool: 'inline-cheap-module-source-map',
            stats: stats
        })
};

module.exports.stats = stats;
