/**
 * Created by lishengyong on 2017/3/15.
 */

function isSlashDate(v) {
    var reg = /(\d{2})\/(\d{2})\/(\d{4})/;
    if (!v) {
        return false;
    }
    if (v.match(reg)) {
        return true;
    }
    return false;
}

function isNumber(v) {
    const reg = /^[0-9]\d*$/g;
    return reg.test(v);
}

function isFloat(v) {
    const reg = /^-?\d+(\.)?(\d+)?$/;
    return reg.test(v);
}

function isFullDateTime(v) {
    var result = v.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/),
        d;
    if (result === null) return false;
    d = new Date(result[1], result[2] - 1, result[3], result[4], result[5], result[6]);
    return (d.getFullYear() === Number(result[1]) && (d.getMonth() + 1) === Number(result[2]) && d.getDate() === Number(result[3]) && d.getHours() === Number(result[4]) && d.getMinutes() === Number(result[5]) && d.getSeconds() === Number(result[6]));

}

function isTime(v) {
    return /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d\.\d{3}$/.test(v);
}

/**
 * 判断参数是否是必须的
 * 0, true, false 也算是合理的参数
 *
 * @param param
 * @returns {boolean}
 */
function isRequired(param) {
    if (param !== 0 && param !== true && param !== false && !param) {
        return false;
    }
    if (param === 'undefined') {
        return false;
    }
    if (Object.prototype.toString.call(param) === '[object Array]' && param.length === 0) {
        return false;
    }
    if (Object.prototype.toString.call(param) === '[object Object]' && Object.keys(param).length === 0) {
        return false;
    }
    return true;
}

export {
    isSlashDate,
    isNumber,
    isFloat,
    isFullDateTime,
    isRequired,
    isTime,
};

