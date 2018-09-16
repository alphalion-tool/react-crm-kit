
import Signals from './signals';

// 是否已经监听了
let hasListening = false;

let hidden,
    visibilityChange;

let callbackArr = [];

window.__PAGE__ = window.__PAGE__ || {};
window.__PAGE__.VISIBLE = true;

if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
}

// 触发Listeners回调
function dispatchListeners (visible) {
    for (let i = 0, len = callbackArr.length; i < len; i++) {
        callbackArr[i] && callbackArr[i](visible);
    }
}

function handleVisibilityChange() {
    if (document[hidden]) {
        window.__PAGE__.VISIBLE = false;
        Signals.dispatch('visibilitychange', false);
        dispatchListeners(false);
    } else {
        window.__PAGE__.VISIBLE = true;
        Signals.dispatch('visibilitychange', true);
        dispatchListeners(true);
    }
}


function run () {
    if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
        // console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
        // Handle page visibility change   
        if (hasListening) return;
        
        hasListening = true;
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
}


// 需要移除重复订阅的
export function addVisibleListener (callback) {
    if (!callback) return;
    const index = callbackArr.findIndex(callback);
    if (index === -1) callbackArr.push(callback);
}

// 移除订阅
export function removeVisibleListener (callback) {
    if (!callback) return;
    const index = callbackArr.findIndex(callback);
    if (index !== -1) callbackArr.splice(index, 1);
}

run();
