/* eslint-disable import/prefer-default-export */

export function newDiv () {
    const dom = document.createElement('div');
    dom.setAttribute('style', 'padding: 20px; width: 600px; height: 700px;');
    return document.body.appendChild(dom);
}