/**
 * @memberOf module:utils/decorators
 * @method resizeInject
 * @description 装饰器；将handleWindowResize注入到Component中，同时窗口size变化时会触发函数执行，以及会调用resizeComponent，用该装饰器，则需要在Component声明resizeComponent方法。
 * @example
 * [at]resizeInject class A extends Component{
 *     resizeComponent(){
 *         console.log('component resize');
 *     }
 *     render(){
 *         return <div onClick={this.handleRouterBack}>click to back</div>
 *     }
 * }
 */

import React from 'react';

function debounce(func, wait) {
    let timeout;

    return function (params) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.call(context, params);
        }, wait);
    };
}

export default function resizeInject(target) {

    // target.prototype.handleWindowResize = function () {
    //     this.winHeight = document.body.clientHeight;
    //     this.resizeComponent && this.resizeComponent();
    // };

    const oldMount = target.prototype.componentDidMount;
    target.prototype.componentDidMount = function () {
        // this.handleWindowResize = this.handleWindowResize.bind(this);
        // this._debounce = debounce(this.handleWindowResize, 300);
        if (this.resizeComponent) {
            this._debounceResizeComponent = debounce(this.resizeComponent, 150);
        }

        window.addEventListener('resize', this._debounce);
        if (oldMount) oldMount.call(this);
    };

    const oldReceive = target.prototype.componentWillReceiveProps;
    target.prototype.componentWillReceiveProps = function (nextProps, ...others) {
        if (nextProps.layoutWidth !== this.props.layoutWidth ||
            nextProps.layoutHeight !== this.props.layoutHeight) {
            this._debounceResizeComponent && this._debounceResizeComponent({ layoutWidth: nextProps.layoutWidth, layoutHeight: nextProps.layoutHeight });
        }
        if (oldReceive) oldReceive.apply(this, [nextProps, ...others]);
    }

    const oldUnmount = target.prototype.componentWillUnmount;
    target.prototype.componentWillUnmount = function () {

        window.removeEventListener('resize', this._debounce);
        if (oldUnmount) oldUnmount.call(this);

    };

    return target;
}
