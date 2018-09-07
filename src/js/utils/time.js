
/**
 * @module utils/time
 * @description 时间处理工具
 */

import moment from 'moment';
import { isString } from 'jscom/utils/lodash';

/**
 * @memberOf module:utils/time
 * @description 时间戳转换到日期字符串
 * @param  {Int} stamp   需要转换的时间戳
 * @return {String}       转换后的字符串
 * @example
 * const ts = +new Date('2016-09-31'); // 
 * const str = timestamp2date(ts); // str == '09/31/2016'
 */
function timestamp2date(stamp) {
    if (stamp) {
        const date = new Date(stamp);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear() + 1900}`;
    }
    return ''
}

// moment转换成string
/**
 * @memberOf module:utils/time
 * @description 将Moment对象转换成字符串
 * @param  {Object} date  moment对象
 * @param  {String} format 转换的日期格式，默认为'YYYY-MM-DD'
 * @return {String}        转换后的结果
 */
function moment2str(date, format = 'YYYY-MM-DD') {
    if (!date) return '';
    return date.format(format);
}

/**
 * @memberOf module:utils/time
 * @description 将日期字符串的格式进行转换，如'MM/DD/YYYY' => 'YYYY-MM-DD'
 * @param {String} date 需要转换的日期字符串
 * @param  {String} oldFormat 原来的格式
 * @param  {String} newFormat 新的格式
 * @return {String}        转换后的结果
 * @example
 * const newDateStr = dateFormatChange('03/12/2017', 'MM/DD/YYYY', 'YYYY-MM-DD'); // result is '2017-03-12'
 */
function dateFormatChange(date, oldFormat, newFormat) {
    if (!date) return '';
    const m = moment(date, oldFormat);
    return m.format(newFormat);
}

// 字符串转换成Moment
/**
 * @memberOf module:utils/time
 * @description 将日期字符串转换成Moment对象
 * @param  {String} str    需要转换的日期字符串
 * @param  {String} format 转换时应用的格式，默认为'YYYY-MM-DD'
 * @return {object}        转换后的结果，此时是moment对象
 */
function str2moment(str, format = 'YYYY-MM-DD') {
    return moment(str, format);
}

// m1 相对m2 之间的秒差距
/**
 * @memberOf module:utils/time
 * @description 计算2个moment时间对象之间的秒差距
 * @param  {Object} m1 第一个Moment对象
 * @param  {Object} m2 第二个moment对象
 * @return {Number}    m1.diff(m2)结果
 */
function diffSeconds(m1, m2) {
    return m1.diff(m2, 'seconds');
}

/**
 * @memberOf module:utils/time
 * @description 日期加操作，意为该日期的几天后，比如说'12/10/2016'加3天为'12/13/2016'
 * @param  {String} date    需要操作的日期
 * @param  {String} days  延后几天
 * @param  {String} format 转换时应用的格式，默认为'YYYY-MM-DD'
 * @return {String}        转换后的结果
 */
function addDays(date, days, format = 'MM/DD/YYYY') {
    if (isString(date)) {
        return moment(date, format).add(days, 'days').format(format);
    }
    return date.add(days, 'days').format(format);
}

/**
 * @memberOf module:utils/time
 * @description 日期减操作，意为该日期往前推几天的日期，比如说'12/10/2016'减3天为'12/07/2016'
 * @param  {String} date    需要操作的日期
 * @param  {String} days  往前几天
 * @param  {String} format 转换时应用的格式，默认为'YYYY-MM-DD'
 * @return {String}        转换后的结果
 */
function subtractDays(date, days, format = 'MM/DD/YYYY') {
    if (!date) return '';
    if (isString(date)) {
        return moment(date, format).subtract(days, 'days').format(format);
    }
    return date.subtract(days, 'days').format(format);
}

/**
 * @memberOf module:utils/time
 * @description 获取今天的某一格式的字符串，如今天是2016-03-12，获取则是'2016-03-12'
 * @param  {String} format 转换时应用的格式，默认为'MM/DD/YYYY'
 * @return {String}        转换后的结果
 */
function todayStr(format = 'MM/DD/YYYY') {
    return moment().format(format);
}

function isBetweenDays(fromD, toD, days, format = 'MM/DD/YYYY') {
    if (!fromD || !toD) {
        return false;
    }
    if (fromD === toD) {
        return true;
    }
    const endD = addDays(fromD, days, format);
    return moment(toD, format).isBetween(moment(fromD, format), moment(endD, format));
}

export {
    timestamp2date as stamp2date,
    moment2str,
    str2moment,
    diffSeconds,
    dateFormatChange,
    isBetweenDays,
    addDays,
    subtractDays,
    todayStr
};