/* eslint-disable import/prefer-default-export */

import { intlMethodInject } from './intl';

import { immutableInject, intlInject, loggerInject, resizeInject, routerHandleInject, sliderInject } from 'jscom/utils/decorators/index';


export function containerMethodInject (target) {
    return intlMethodInject(loggerInject(resizeInject(immutableInject(target))));
}

export const containerInject = containerMethodInject;
