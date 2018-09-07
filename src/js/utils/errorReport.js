const axios = require('axios');
const sourceMapStack = require('sourcemapped-stacktrace');

const ERROR_REPORT = (function (global) {

    if (global.ERROR_REPORT) return global.ERROR_REPORT;

    const TIME_OUT = 300;
    const MSG_MAX_LENGTH = 1000;
    const FILE_MAX_LENGTH = 249;

    const _config = {
        url: '', // 服务器路径， 可以在知道服务器的情况下配置默认值
        cache: true, // 是否缓存，默认为true。
        repeatTimes: 5, // 当cache 为true 时。 可以设置同一个位置的错误上报次数。如果不想限制，则设置cache为false即可
    };

    const errorList = [];

    const cacheMap = {}; // 缓存错误信息。

    const reportMsg2Server = (url, data) => {
        if (!url || !data) {
            return;
        }
        /* const img = new Image();
        let serverUrl = url;
        const keys = Object.keys(data);
        keys.forEach((key, index) => {
            if (index === 0) {
                serverUrl += `?${key}=${data[key]}`;
            } else {
                serverUrl += `&${key}=${data[key]}`;
            }
        });
        img.src = serverUrl; */
        axios({
            method: 'post',
            url,
            data,
        });

    };

    const processStackMsg = error => {
        var stack = error.stack
            .replace(/\n/gi, '')
            .split(/\bat\b/)
            .slice(0, 9)
            .join('@')
            .replace(/\?[^:]+/gi, '');
        var msg = error.toString();
        if (stack.indexOf(msg) < 0) {
            stack = `${msg}@${stack}`;
        }
        // 处理错误信息过长的情况
        if (stack.length > MSG_MAX_LENGTH) {
            stack = stack.substr(0, MSG_MAX_LENGTH - 1);
        }
        return stack;
    };

    const report = global.ERROR_REPORT = {
        init: config => {
            if (Object.prototype.toString.call(config) === '[object Object]') {
                const keys = Object.keys(config);
                keys.forEach(key => {
                    _config[key] = config[key];
                });
            }
            return report;
        },
        /**
         * 直接上报错误信息
         * error: Object
         *  file: String, 发生错误的文件
         *  line: Number, // 行号
         *  col: Number, // 列号
         *  msg: String, // 错误栈信息
         */
        report: error => {
            reportMsg2Server(_config.url, error);
        },
        reportMsg: () => {
            const error = errorList.shift();
            error && setTimeout(() => {
                // 延迟上报错误， 以防错误太频繁
                reportMsg2Server(_config.url, error);
            }, TIME_OUT);
            return report;
        },
        /**
         * 把错误信息放入待发送信息队列里
         */
        push: ({ errorMsg, scriptURI, lineNumber, columnNumber, errorObj }) => {
            let stackMsg = errorMsg;
            let file = scriptURI;
            if (errorObj) {
                stackMsg = processStackMsg(errorObj);
            }
            // 防止文件名过长。
            if (scriptURI.length > FILE_MAX_LENGTH) {
                file = scriptURI.substr(scriptURI.lastIndexOf('/'), scriptURI.length);
            }
            const error = {
                message: errorMsg,
                file,
                line: lineNumber,
                col: columnNumber,
                msg: stackMsg,
            };

            // 判断是否重复发送同一个错误。
            if (!report.isRepeat(error)) {
                errorList.push(error);
            }
        },
        /**
         * 判断在错误缓存中是否存在同一个错误，以及该错误的上报次数是否超过限定值
         */
        isRepeat: error => {
            if (!_config.cache) {
                return false;
            }
            const key = `${error.fileName}-${error.lineNumber}-${error.columnNumber}`;
            const cacheErr = cacheMap[key];
            if (!cacheErr) {
                cacheMap[key] = {
                    error,
                    count: 1
                };
                return false;
            }
            if (cacheErr.count > _config.repeatTimes - 1) {
                return true;
            }
            cacheMap[key].count += 1;
            return false;
        }
    };

    // 低版本浏览器只有前三个参数
    window.onerror = (errorMsg, scriptURI, lineNumber, columnNumber, errorObj) => {
        // debug模式下不传输日志
        if (!window.__DEV__) {
            sourceMapStack.mapStackTrace(errorObj ? errorObj.stack : '', (mappedStack) => {
                const msg = mappedStack.join('\n');
                report.push({ errorMsg: msg, scriptURI, lineNumber, columnNumber });
                report.reportMsg();
            }, {
                filter: function () { return true; }
            });
        }

    };

    return report;

})(window);

export default ERROR_REPORT;