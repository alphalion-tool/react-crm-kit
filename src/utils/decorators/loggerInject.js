/**
 * @memberOf module:utils/decorators
 * @method loggerInject
 * @description 装饰器；将console方法注入到Component原型中，访问方式为logger，根据是否debug显示log，判断window.__DEV__
 * @example
 * [at]loggerInject class A extends Component{
 *     render(){
 *         this.logger.log('this is my log')
 *         return <div>This is A</div>
 *     }
 * }
 */
import { logger } from '../logger';

export default function loggerInject(target) {
    const obj = logger();
    target.prototype.logger = obj;
    target.prototype.loggerInject = true;
    return target;
}