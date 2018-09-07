/* eslint-disable  import/no-unresolved, import/extensions */

import register from 'ignore-styles';
import { JSDOM } from 'jsdom';
import path from 'path';
import fs from 'fs';
import { WebSocket, Server } from 'mock-socket';

register(['.sass', '.scss', 'css']);

// const cssPath = path.join(__dirname, './static/index.css');
// const mainCss = fs.readFileSync(cssPath, 'utf8');

const jsdom = new JSDOM('<!doctype html><html><head></head><body style="width: 500px; height: 600px;"></body></html>', {
    // resources: 'usable',
});
const { window } = jsdom;


Object.defineProperties(window.HTMLElement.prototype, {
    offsetLeft: {
        get: function() { return parseFloat(window.getComputedStyle(this).marginLeft) || 0; }
    },
    offsetTop: {
        get: function() { return parseFloat(window.getComputedStyle(this).marginTop) || 0; }
    },
    offsetHeight: {
        get: function() { return parseFloat(window.getComputedStyle(this).height) || 0; }
    },
    offsetWidth: {
        get: function() { return parseFloat(window.getComputedStyle(this).width) || 0; }
    }
});

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter((prop) => typeof target[prop] === 'undefined')
        .map((prop) => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

global.window = window;
global.window.scrollTo = function (x, y) {};
global.document = window.document;
global.WebSocket = WebSocket; // window.WebSocket;
global.navigator = {
    userAgent: 'node.js',
};

// var head = document.getElementsByTagName('head')[0];
// const style = document.createElement("style");
//     style.type = 'text/css';
//     style.innerHTML = mainCss;
//     head.appendChild(style);

// window.addEventListener('load', () => {
//     console.log('load');
// }, false);

if (!global.window.localStorage) {
    global.localStorage = global.window.localStorage = {
        getItem() { return '{}'; },
        setItem() {}
    };
}

copyProps(window, global);
