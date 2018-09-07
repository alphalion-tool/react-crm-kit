/**
 * @module utils/component
 * @description 关于组件使用的工具
 */
import loggerInject from './loggerInject';
import intlInject from './intlInject';
import resizeInject from './resizeInject';
import immutableInject from './immutableInject';
import connectPermission from './connectPermission';

function containerInject (target) {
    return intlInject(resizeInject(loggerInject(immutableInject(target))));
}

export {
    loggerInject,
    intlInject,
    resizeInject,
    immutableInject,
    containerInject,
    connectPermission
};