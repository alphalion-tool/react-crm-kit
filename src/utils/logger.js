/**
 * @module utils/logger
 * @description logger工具，根据是否debug显示log
 * @param  {Boolean} isDebug 是否是debug状态
 * @return {Object}          日志函数
 */

const funcKeys = ['debug', 'error', 'info', 'log', 'warn', 'trace'];

export function logger () {
    /* eslint-disable */
    const ie9Flag = navigator.userAgent.indexOf('MSIE 9.0') > -1 ? true : false;
    /* eslint-enable */
    /* eslint-disable no-console */
    const obj = {};

    if (window.__DEV__) {
        funcKeys.forEach((key) => {
            /* istanbul ignore next */
            obj[key] = function () {}; 
            if (typeof console[key] === 'function') {
                obj[key] = console[key].bind(window.console);  /* NotClearConsole */
            }
            /* istanbul ignore if */
            if (ie9Flag && typeof console[key] === 'object') {
                /* istanbul ignore next */
                obj[key] = Function.prototype.bind.call(console[key], console);
            }
        });
    } else {
        funcKeys.forEach((key) => {
            obj[key] = function () {};
        });
    }
    return obj;
}

export default (function() {
    window.BLog = logger();
    return window.BLog;
})();