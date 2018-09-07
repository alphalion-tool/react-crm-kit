/* eslint-disable max-len, import/prefer-default-export */
/*
 * @desc 用于环境处理的
 */

import CurrencySchema from 'jscom/schemas//CurrencySchema';
import CountrySchema from 'jscom/schemas//CountrySchema';
import { str2moment, moment2str, todayStr } from 'jscom/utils/time';


/**
 * @description  处理contants变量的，挂载至 WINDOW.__DATA__.CONSTANTS 里面的
 */
export function processAppConstants (constants = {}) {
    window.__DATA__ = window.__DATA__ || {};
    window.__DATA__.CONSTANTS = window.__DATA__.CONSTANTS || { ...constants };

    // country
    const countries = constants.country || [];
    window.__DATA__.COUNTRY = countries;
    window.__DATA__.COUNTRY_OPTIONS = countries.map((item) => CountrySchema.country2Option(item));

    // currency
    const currencies = constants.currency || []
    window.__DATA__.CURRENCY = currencies;
    window.__DATA__.CURRENCY_OPTIONS = currencies.map((item) => CurrencySchema.currency2Option(item));

}

/**
 * 初始登录后的所有初始化的处理
 * @param  {object} data 也就是window.__data，或者login登录后的返回数据
 */
export function processAppEnv (data) {
    // businessdata在首页中直接获取，跟登录与否无关
    if (data.businessDate) {
        window.__DATA__.BUSINESS_DATE = moment2str(str2moment(data.businessDate, 'YYYY-MM-DD'), 'MM/DD/YYYY');
        window.__DATA__.TODAY = todayStr('MM/DD/YYYY');
    }
    if (data && data.isLoggedIn) {
        window.__DATA__.PERMISSION = data.permission;
        window.__DATA__.EXCLUDE = data.exclude;  // 权限标志位 标志是否有修改其他role的权限
        window.__DATA__.USER = data.user;
        window.__DATA__.CONSTANTS = data.constants;
        // window.__DATA__.BUSINESS_DATE = moment2str(str2moment(data.businessDate, 'YYYY-MM-DD'), 'MM/DD/YYYY');
        // window.__DATA__.TODAY = todayStr('MM/DD/YYYY');
        processAppConstants(data.constants);
    } else {
        window.__DATA__.PERMISSION = {};
        window.__DATA__.EXCLUDE = null;   // 权限标志位 标志是否有修改其他role的权限
        window.__DATA__.USER = {};
        window.__DATA__.CONSTANTS = {};
        // window.__DATA__.BUSINESS_DATE = '';
        // window.__DATA__.TODAY = '';
        processAppConstants({});
    }

}
