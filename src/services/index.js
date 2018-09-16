
import loadsh from 'lodash';
import { httpGet, httpPost } from './fetch';
import apis from './api';

// 将字符串的变量替换掉
function compile (string, data) {
    return loadsh.template(string, { interpolate: /\${([\s\S]+?)}/g })(data);
}

const APIS = {
    URL: {},
    RAW: {},
};
// 对已有的请求链接做映射
Object.keys(apis).forEach((name) => {
    const api = apis[name];
    const { method, url } = api;
    // 是否提醒需要登录
    const createReq = (config) => {
        return (...args) => {
            let tmplData = null,
                formData = null,
                outerConfig = {};
            if (args.length === 2) {
                tmplData = args[0];
                formData = args[1];
            } else if (args.length === 1) {
                formData = args[0];
            }
            if (args.length === 3) {
                tmplData = args[0]
                formData = args[1]
                outerConfig = args[2]
            }
            let func = httpGet;
            if (method === 'post') func = httpPost;
            return func(compile(url, tmplData), formData, Object.assign(config, outerConfig));
        };
    }

    APIS[name] = createReq({ AUTHCHECK: true, timeout: 30000 });  // 提醒出错
    APIS.RAW[name] = createReq({ AUTHCHECK: false, timeout: 30000 }); // 不提醒登录出错
    APIS.URL[name] = url;
});

export default APIS;