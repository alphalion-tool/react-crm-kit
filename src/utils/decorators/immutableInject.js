/**
 * @memberOf module:utils/decorators
 * @method immutableInject
 * @description 装饰器；使用该装饰器，会修改shouldComponentUpdate行为，使针对深度的数据导致页面更新不及时变成及时。使用该装饰器后，建议state改为immutable对象的数据
 * @example
 * import { IList } from 'jscom/utils/immutable';
 * [at]immutableInject class A extends Component{
 *     state = {
 *         list: new IList([1, 2, 3])
 *     };
 *
 *     render(){
 *         return <div>{this.state.list.join(',')}</div>
 *     }
 * }
 */

import { keys as objectKeys } from 'jscom/utils/lodash';
import { is } from 'jscom/utils/immutable';
import React from 'react';

export default function immutableInject(target) {

    const oldUpdate = target.prototype.shouldComponentUpdate;
    target.prototype.shouldComponentUpdate = function(nextProps = {}, nextState = {}) {

        // 如果已经有了定义，则直接用定义的
        if (oldUpdate) return oldUpdate.call(this, nextProps, nextState);

        // 如果没有定义的，则用下面的逻辑
        const thisProps = this.props || {},
            thisState = this.state || {};

        if (objectKeys(thisProps).length !== objectKeys(nextProps).length ||
            objectKeys(thisState).length !== objectKeys(nextState).length) {
            return true;
        }

        let keys = objectKeys(nextProps);
        for (let i = 0, len = keys.length; i < len; i++) {
            if (!is(thisProps[keys[i]], nextProps[keys[i]])) {
                return true;
            }
        }

        keys = objectKeys(nextState);
        for (let i = 0, len = keys.length; i < len; i++) {
            const key = keys[i];
            if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                return true;
            }
        }

        return false;
    };

    return target;
}