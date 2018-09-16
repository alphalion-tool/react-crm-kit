
/**
 * @module utils/immutable
 * @description Immutable对象的工具
 */

// view https://facebook.github.io/immutable-js/docs/#/
import Immutable, {
    fromJS,
    is,
    List as IList,
    Map as IMap,
    OrderedMap as IOrderedMap,
    Set as ISet,
    OrderedSet as IOrderedSet,
    Collection as ICollection,
    Stack as IStack,
    Record as IRecord,
    Seq as ISeq
} from 'immutable';

export {
    /**
     * @memberOf module:utils/immutable
     * @description 从js变量来产生immutable对象
     * @{@link https://facebook.github.io/immutable-js/docs/#/fromJS}
     */
    fromJS,

    /**
     * @memberOf module:utils/immutable
     * @description 是否是immutable对象
     * @{@link https://facebook.github.io/immutable-js/docs/#/is}
     */
    is,

    /**
     * @memberOf module:utils/immutable
     * @description Immutable中的List类
     * @{@link https://facebook.github.io/immutable-js/docs/#/List}
     */
    IList,

    /**
     * @memberOf module:utils/immutable
     * @description Immutable中的Map类
     * @{@link https://facebook.github.io/immutable-js/docs/#/Map}
     */
    IMap,

    /**
     * @memberOf module:utils/immutable
     * @description Immutable中的Set类
     * @{@link https://facebook.github.io/immutable-js/docs/#/Set}
     */
    ISet,

    /**
     * @memberOf module:utils/immutable
     * @description Immutable中的Collection类
     * @{@link https://facebook.github.io/immutable-js/docs/#/Collection}
     */
    ICollection
};