/**
 * @module utils/service
 * @description 网络请求的最底层封装
 */

import NetworkError from './NetworkError';
import axios from 'axios';
import Signals from 'jscom/utils/signals';

/**
 * @memberOf module:utils/service
 * @description http get方法
 * @param  {String} url    请求链接
 * @param  {Object} params 请求的参数
 * @return {Object}        返回Promise对象
 */
function httpGet(url, params, config = { AUTHCHECK: true }) {
    return new Promise( (resolve, reject) => {
        axios.get(url, { ...config, params })
        .then((response) => {
            const { data, status, statusText, headers } = response;
            response.serviceConfig = config;
            if (status > 206 ) {
                return reject(new NetworkError(response));
            }
            if (config.AUTHCHECK && data.code === 1) {
                // login expired
                Signals.dispatch('authExpired');
            }

            if (data.code !== 0 && status === 200) {
                return reject(new NetworkError(response));
            }

            return resolve(response);
        }).catch((err) => {
            reject(NetworkError.createFromError(err));
        });
    });
}

/**
 * @memberOf module:utils/service
 * @description http post方法
 * @param  {String} url    请求链接
 * @param  {Object} params 请求的参数
 * @return {Object}        返回Promise对象
 */
function httpPost(url, params, config = { AUTHCHECK: true }) {
    return new Promise( (resolve, reject) => {
        axios.post(url, params, config)
        .then((response) => {
            const { data, status, statusText, headers } = response;
            response.serviceConfig = config;

            if (status !== 200) {
                return reject(new NetworkError(response));
            }
            if (config.AUTHCHECK && data.code === 1) {
                // login expired
                Signals.dispatch('authExpired');
            }
            if (data.code !== 0) {

                return reject(new NetworkError(response));
            }

            return resolve(response);
        }).catch( (err) => {
            reject(NetworkError.createFromError(err));
        });
    });
}


export {
    httpGet as get,
    httpGet,
    httpPost as post,
    httpPost,
};