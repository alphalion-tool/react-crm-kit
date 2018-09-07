// for production
var webpack = require('webpack');
var path = require('path');
var readConfig = require('read-config');
var WebpackShellPlugin = require('webpack-shell-plugin');
var fs = require('fs');
var staticRoot = path.join(__dirname, 'build/static/');
var config = require('./webpack.common.js')(staticRoot, true);
var templatePath = path.join(__dirname, 'server/templates/');
var buildTemplatePath = path.join(__dirname, 'build/template/');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var WebpackClearConsole = require("webpack-clear-console").WebpackClearConsole;
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// webpack4 config
config.mode = 'production'; // 生产模式
config.devtool = 'source-map'; // 为了对错误进行跟踪。需要设置为source-map

config.optimization.minimizer = [
    new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
];

// 图片压缩
const imageRules = config.module.rules[1];
imageRules.use[1].options = {
    mozjpeg: {
        quality: 65
    },
    pngquant: {
        quality: "65-90",
        speed: 4
    },
    svgo: {
        plugins: [{ removeViewBox: false }, { removeEmptyAttrs: false }]
    }
};

config.plugins = [
    new CaseSensitivePathsPlugin({ debug: false }),

    // new WebpackClearConsole(),

    function () {
        this.plugin('done', function (stats) {
            const info = stats.toJson();
            if (stats.hasErrors()) {
                throw Error(info.errors);
            }
            // 替换掉index.jade中的__v__值
            var htmlPath = path.join(templatePath, 'index.pug');
            var newHtmlPath = path.join(buildTemplatePath, 'index.jade');
            var template = fs.readFileSync(htmlPath, 'utf8');
            var html = template.replace(/__v__/g, `v=${stats.hash}`).replace(/BUILD_TIME_TAG/, `${new Date()}`);
            fs.writeFile(newHtmlPath, html);

            // 移除css的sourcemap
            var cssPath = path.join(staticRoot, 'main.css');
            var cssContent = fs.readFileSync(cssPath, 'utf8');
            var css = cssContent.replace(/\/\*# sourceMappingURL=data:application\/json;charset=utf-8;base64,.*?\*\//g, '');
            fs.writeFile(cssPath, css);
        })
    }

].concat(config.plugins);

config.plugins.push(
    new WebpackShellPlugin({
        onBuildStart: ['pwd && rm -rf ./build/static/* && echo "Webpack Start"'],
        onBuildEnd: ['echo "Webpack End"'],
        onBuildExit: ['echo "webpack exit"']
    })
)

config.cache = false;

module.exports = config;
