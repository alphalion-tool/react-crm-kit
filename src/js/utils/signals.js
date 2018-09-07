/**
 * @module utils/Signal
 * @description 信号中心，使用场景：非Component中，需要在App上展示错误信息等类似的需求       
 *      比如说websocket中出错了，此时将发送错误弹窗信息。组件与组件（非父子关系）之间的数据传递用redux来完成，不可用该处理方式
 */


import Signal from 'signals';

class Signals {

    /* 信号中心集合 */
    signals = {
        tips: new Signal(),  // 默认tips信号
    };

    /* 绑定事件 */
    on(type, listener) {
        if (type !== 'tips') {
            this.signals[type] = new Signal();
        }
        this.signals[type].add(listener);
    }

    /* 触发事件 */
    dispatch(type, ...params) {
        if (this.signals[type]) {
            this.signals[type].dispatch(...params);
        }
    }

    /* 移除事件 */
    remove(type, listener) {
        if (this.signals[type]) {
            this.signals[type].remove(listener);
        }
    }

    /* 移除所有的事件 */
    removeAll (type) {
        if (this.signals[type]) {
            this.signals[type].removeAll();
        }
    }

    /* 触发边角提示 */
    triggerTips (...params) {
        this.signals.tips.dispatch(...params);
    }
}


export default new Signals();