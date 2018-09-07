/**
 * @class NetworkError
 * @description 网络错误类
 */

// 获取错误时候的data，并展示成字符串
export function errorMsgWithData (data) {
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) {
        return data.map((item) => errorMsgWithData(item)).join(',');
    }
    // 是object

    if ('k' in data && 'v' in data) {
        return `${data.k}[${errorMsgWithData(data.v)}]`;
    }
    if (data.field && data.msg) {
        return `${data.field}[${errorMsgWithData(data.msg)}]`;
    }

    if (data.fields && data.fields.length > 0) {
        let _errorMsg = '';
        data.fields.forEach((fieldData, fieldIdx) => {
            _errorMsg += `${fieldIdx + 1}. ${fieldData.field}[${errorMsgWithData(fieldData.msg)}]`;
        })
        return _errorMsg;
    }

    return '';
}

export function errorMsgWithCode5 (data) {
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) {
        return data.map((item) => errorMsgWithCode5(item)).join(',');
    }
    // 是object

    if (data.params) {
        return `${data.params.join(',')}`;
    }
    return '';
}


export default class NetworkError extends Error {
    /**
     * @memberOf class:NetworkError
     * @param  {Object} response 返回的请求结果
     * @param  {Boolean} fromError 从error产生
     */
    constructor(response, fromError?: bool) {
        super('Network error');
        let message = 'Network error';
        let name = 'Network error';
        if (fromError) {
            this.message = response.message || '';
            if (this.message.search(/timeout/) !== -1) {
                this.message = 'Network Timeout';
            }
            this.name = response.name || name;
            this.response = response.response || {};
            return;
        }
        const { config, data, headers, status } = response;
        const { url, method } = config;
        if (status > 206 && status !== 304) {
            message = `Response status ${status} when ${method} ${url}`;
            name = 'Client Error';
        } else {
            const code = data.code,
                resData = data.data,
                msg = data.msg;
            switch (code) {
                case 5:
                    name = 'Param Error';
                    message = `${msg} in ${errorMsgWithData(resData)}`;
                    break;
                case 4:
                    name = 'System Error';
                    message = `System Error: ${errorMsgWithData(resData)}`;
                    break;
                case 3:
                    name = 'Param Error';
                    message = `Param Error: ${errorMsgWithData(resData)}`;
                    // message = `Param Error in ${resData.join(', ')}`;
                    break;
                case 2:
                    name = 'Forbidden';
                    message = `Forbidden when ${method} ${url}`;
                    break;
                case 1:
                    name = 'Not Login';
                    message = 'Login status has expired';
                    // message = `You need Login, when ${method} ${url}`;
                    break;
                case -3:
                    name = 'Login Error';
                    message = 'Name or Password error';
                    break;
                case -4:
                    name = 'Login Error';
                    message = 'Auth Code error';
                    break;
                case -5:
                    name = 'Login Error';
                    message = 'Password error';
                    break;
                default:
                    name = 'Unknown Error';
                    message = `Unknown Error, this is not defined in the Client, Response status ${status} when ${method} ${url}`;
                    break;
            }
        }
        this.message = message;
        this.name = name;
        this.response = response;
    }

    static createFromError (err) {
        return new NetworkError(err, true);
    }
}