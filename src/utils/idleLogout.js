/* eslint-disable import/prefer-default-export */

let idleCheckInterval = null;
let timeoutCallback = null;
const refreshSeconds = 60 * 60; // refresh频率
const intervalSeconds = 2;
let lastUserSeconds = 0; // 最后操作后的时间
let hasFocus = false;
let isTimeout = false;

function reset() {
    isTimeout = false;
    lastUserSeconds = 0;
    // console.log('Reset');
}


function refreshCheck() {
    const focus = window.onfocus;
    // console.log(lastUserSeconds, refreshSeconds);
    if ((lastUserSeconds >= refreshSeconds && !isTimeout && document.readyState === 'complete')) {
        // console.log('need load');
        isTimeout = true;
        if (timeoutCallback) timeoutCallback();
    }
}

function windowHasFocus() {
    reset();
}

function windowLostFocus() {
    hasFocus = false;
}

// 开始监听用户操作
export function startIdleCheck (callback) {
    // console.log('start idle check');
    timeoutCallback = callback;
    window.addEventListener('focus', windowHasFocus, false);
    window.addEventListener('blur', windowLostFocus, false);
    window.addEventListener('click', reset, false);
    window.addEventListener('mousemove', reset, false);
    window.addEventListener('keypress', reset, false);
    window.addEventListener('scroll', reset, false);
    document.addEventListener('touchMove', reset, false);
    document.addEventListener('touchEnd', reset, false);

    idleCheckInterval = setInterval(() => {
        lastUserSeconds += intervalSeconds;
        refreshCheck();
    }, intervalSeconds * 1000);
}

// 停止监听用户操作
export function clearIdleCheck (callback) {
    // console.log('clear idle check');

    if (idleCheckInterval) clearInterval(idleCheckInterval);
    window.removeEventListener('focus', windowHasFocus, false);
    window.removeEventListener('blur', windowLostFocus, false);
    window.removeEventListener('click', reset, false);
    window.removeEventListener('mousemove', reset, false);
    window.removeEventListener('keypress', reset, false);
    window.removeEventListener('scroll', reset, false);
    document.removeEventListener('touchMove', reset, false);
    document.removeEventListener('touchEnd', reset, false);
}