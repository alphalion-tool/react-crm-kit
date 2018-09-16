/**
 * @module utils/lodash
 * @description lodash的常用方法集成
 */
import cloneDeep from 'lodash.clonedeep';
import keys from 'lodash.keys';
import assignIn from 'lodash.assignin';
import filter from 'lodash.filter';
import { assign, omit, merge } from 'lodash/object';
import isNumber from 'lodash.isnumber';
import isEqual from 'lodash.isequal';
import { isError, attempt, uniq, isString, isObject, times, camelCase, startCase, isArray, isFunction } from 'lodash';

export {
    /**
     * @memberOf module:utils/lodash
     * @description object.assign方法
     * @{@link http://www.css88.com/doc/lodash/#_assignobject-sources}
     */
    assign,

    /**
     * @memberOf module:utils/lodash
     * @description object.assignIn
     * @{@link http://www.css88.com/doc/lodash/#_assigninobject-sources}
     */
    assignIn,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.cloneDeep深度复制
     * @{@link http://www.css88.com/doc/lodash/#_clonedeepvalue}
     */
    cloneDeep,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.collection.filter函数
     * @{@link http://www.css88.com/doc/lodash/#_filtercollection-predicate_identity}
     */
    filter,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.object.keys
     * @{@link http://www.css88.com/doc/lodash/#_keysobject}
     */
    keys,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.lang.isNumber
     * @{@link http://www.css88.com/doc/lodash/#_isnumbervalue}
     */
    isNumber,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.lang.isstring
     * @{@link http://www.css88.com/doc/lodash/#_isstringvalue}
     */
    isString,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.lang.isObject
     * @{@link https://lodash.com/docs/4.17.4#isObject}
     */
    isObject,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.object.omit
     * @{@link http://www.css88.com/doc/lodash/#_omitobject-props}
     */
    omit,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.object.merge
     * @{@link http://www.css88.com/doc/lodash/#_mergeobject-props}
     */
    merge,

    /**
     * @memberOf module:utils/lodash
     * @description lodash.times
     * @{@link http://www.css88.com/doc/lodash/#_mergeobject-props}
     */
    times,

    isArray,

    isFunction,

    camelCase,

    startCase, // geng_biao_is_handsome => Geng Biao Is Handsome

    uniq,

    isError,

    attempt,

    isEqual
};