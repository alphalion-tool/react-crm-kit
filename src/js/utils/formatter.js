
/* eslint-disable no-restricted-syntax */

/**
 * @module utils/formatter
 * @description 输出格式化的处理工具
 */
import moment from 'moment';
import { isNumber, startCase, isArray, isFunction } from 'jscom/utils/lodash';

const dateFormatOption = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
};

const FXTypes = {
    Spot: 'Spot',
    Forward: 'Forward',
    Swap: 'Swap',
    NDF: 'NDF',
    Option: 'Option',
};

/**
 * @memberOf module:utils/formatter
 * @param  {Number} num       需要格式化的数字
 * @param  {Boolean} priceFlag 是否是金钱，如果是金钱则展示六位，否则为2位
 * @return {String}           即将展示的值
 */
function formatNumber(num, priceFlag) {
    if (!isNumber(num)) return num;
    const len = priceFlag ? 6 : 2;
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: len, maximumFractionDigits: len }).format(num);
}

/**
 * @memberOf module:utils/formatter
 * @param  {Number} value       需要格式化的数字
 * @param  {Boolean} decimal 小数点位数
 * @return {String}           即将展示的值
 */
const formatWithDecimal = (value, decimal = 0) => {
    if (!isNumber(value) || decimal < 0) return value;
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimal, maximumFractionDigits: decimal }).format(value);
};

/**
 * @memberOf module:utils/formatter
 * @param  {Number} value       需要格式化的金钱
 * @return {String}           即将展示的值
 */
function formatPrice(value) {
    return formatNumber(value, true);
}


/**
 * @memberOf module:utils/formatter
 * @param  {String} str       需要格式化的日期
 * @return {String}           即将展示的值
 */
function formatDate(str, oldFormat = 'YYYY-MM-DD', newFormat = 'MM/DD/YYYY') {
    if (!str) return '';
    try {
        if (typeof str === 'number') {
            return moment(str).format(newFormat);
        }
        return moment(str, oldFormat).format(newFormat);
    } catch (e) {
        BLog.error(e);
        return 'Invalid Date';
    }
}


/**
 * @memberOf module:utils/formatDateTime
 * @param {String} str  需要格式化的日期
 * @param {String} oldFormat 旧的格式，默认是yyyy-mm-dd HH:mm:ss
 * @param {String} newFormat 新的格式，默认是mm/dd/yyyy HH:mm:ss
 * @return {String} 返回的值
 */
function formatDateTime(str, oldFormat = 'YYYY-MM-DD HH:mm:ss', newFormat = 'MM/DD/YYYY HH:mm:ss') {
    if (!str) return '';
    return moment(str, oldFormat).format(newFormat);
}


/**
 * @memberOf module:utils/formatter
 * @param  {String} num       需要格式化的日期
 * @param {String} fmt 格式
 * @return {String}           即将展示的值
 */
function formatDateToDash(strDate) {
    if (!strDate) {
        return '';
    }
    return moment(strDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
}

function formatDateToSlash(src) {
    if (!src) {
        return '';
    }
    return moment(src, 'YYYY-MM-DD').format('MM/DD/YYYY');
}

/**
 * 递归格式化嵌套的数组数据
 * [
 *  {
 *      value: 'test'
 *      key: '1',
 *      childList: [
 *          { value: 'ctest', key:'2'}
 *      ]
 *  },
 * ]
 *
 * @param {*} src  原始数组
 * @param {*} childKey 嵌套数组的键名  'childList'
 * @param {*} callb 对数据的格式化函数
 */
function formatNestArr(src, childKey, callb) {
    if (!isArray(src)) {
        return src;
    }
    if (!callb || !isFunction(callb)) {
        return src;
    }
    return src.map(item => {
        const tempItem = callb(item);
        const child = item[childKey];
        if (child
            && isArray(child)
            && child.length > 0) {
            tempItem[childKey] = formatNestArr(child, childKey, callb);
        }
        return tempItem;
    });
}


/**
 * 递归格式化嵌套的数组数据
 *
 * @param {*} src  原始数组
 * @param {*} childKey 嵌套数组的键名  'childList'
 * @param {*} callb 对数据的格式化函数
 */
function formatTreeNestArr(src, childKey = 'childList', callb) {
    if (!isArray(src)) {
        return src;
    }
    return src.map(item => {
        let tempItem = [];
        if (isFunction(callb)) {
            tempItem = callb(item);
        } else {
            tempItem = {
                label: item.v,
                key: item.k,
                value: item.k,
                childList: item.childList
            };
        }
        const child = item[childKey];
        if (child
            && isArray(child)
            && child.length > 0) {
            tempItem[childKey] = formatNestArr(child, childKey, callb);
        }
        return tempItem;
    });
}


/**
 * 递归格式化嵌套的数组数据，根据name过滤字段，将其转换成object
 *
 * @param {*} src  原始数组
 * @param {*} level 层级，即抽取第几层，默认为第一层
 */
function formatTreeNestArrByName2Map (arr, name = '') {
    if (!name) return {};
    if (!isArray(arr)) return {};
    let obj = {};
    arr.forEach((item) => {
        if (item.name === name) {
            // 无childList
            obj[item.k] = {
                key: item.k,
                value: item.k,
                label: item.v,
            };
        }
        if (item.childList && item.childList.length) {
            // 有childList
            const tmpObj = formatTreeNestArrByName2Map(item.childList, name);
            Object.keys(tmpObj).forEach((tmpKey) => {
                obj[tmpKey] = tmpObj[tmpKey];
            });
        }
    });
    return obj;
}

/**
 * 递归格式化嵌套的数组数据，根据level将其转换成object
 *
 * @param {*} src  原始数组
 * @param {*} level 层级，即抽取第几层，默认为第一层
 * @param {*} curLevel 当前层级
 */
function formatTreeNestArrByLevel2Map (arr, level = 1, curLevel = 1) {
    if (!isArray(arr)) return {};
    let obj = {};
    arr.forEach((item) => {

        if (curLevel === level) {
            // 无childList
            obj[item.k] = {
                key: item.k,
                value: item.k,
                label: item.v,
            };
        }

        if (item.childList && item.childList.length) {
            // 有childList
            const tmpObj = formatTreeNestArrByLevel2Map(item.childList, level, curLevel + 1);
            Object.keys(tmpObj).forEach((tmpKey) => {
                obj[tmpKey] = tmpObj[tmpKey];
            });
        }
    });
    return obj;
}



/**
 * @memberOf module:utils/formatter
 * @param  {not boolean|boolean} target 需要转化的值
 * @return {String}           即将展示的值
 */
function formatRadioValue(target) {
    if (typeof (target) === 'string') {
        if (target === 'true') return 'Yes';
        if (target === 'false') return 'No';
    }
    if (typeof (target) === typeof (true)) {
        if (target) {
            return 'Yes';
        } else {
            return 'No';
        }
    }

    return '';
}

export {
    formatNestArr,
    formatTreeNestArr,
    formatTreeNestArrByName2Map,
    formatTreeNestArrByLevel2Map,
    formatNumber,
    formatPrice,
    formatWithDecimal,
    formatDate,
    formatDateTime,
    formatDateToDash,
    formatDateToSlash,
    formatRadioValue,
};
