/**
 * @memberOf module:utils/decorators
 * @method intlInject
 * @description 装饰器；国际化操作，使用该装饰器，会往Component注入intl函数，调用该函数，即可对内容进行国际化展示
 * @example
 * [at]intlInject class A extends Component{
 *     render(){
 *         return <div>This is my {this.intl('common.string.computer')}</div>
 *     }
 * }
 */

import { intlInject } from 'jscom/assets/locales/index';

export default intlInject;