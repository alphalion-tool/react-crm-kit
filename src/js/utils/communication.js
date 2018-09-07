/**
* @module utils/communition
* @description 通信工具
* 
*/
/* eslint-disable */
import { Message, Notification } from 'antd';

const host = window.location.host;
const protocol = window.location.protocol;
export const url = protocol === 'https:' ? `wss://${host}/ws` : `ws://${host}/ws`;

const communication = {
    listeners: {},
    socket: null,
    sendBuffer: [],
    TIMER: null,
    onLine: false,
    heartBeat: { 'type': 'heart-beat', 'action': 'query' },
    socketInit: function () {
        if (!this.socket || this.socket.readyState === 3) {
            this.socket = new WebSocket(url)
            this.socket.onopen = () => {
                const timer = setInterval(() => {
                    if (this.socket && this.socket.readyState === 1) {
                        this.onLine = true;
                        if (this.sendBuffer.length) {
                            this.sendBuffer.forEach((val) => {
                                this.socket.send(val)
                            })
                            this.sendBuffer = [];
                        }
                        this.socket.onmessage = (val) => {
                            let value = JSON.parse(val.data);
                            let item = this.listeners && this.listeners[value.type]
                            if (value.code === 2 ) {
                                Message.error('No permission!');
                                item.fn(value)
                                return
                            }
                            if (item) {
                                if (item.dataArray.length) {
                                    item.dataArray.push(value)
                                } else {
                                    if (item.time) {
                                        item.dataArray.push(value)
                                        const flag = setInterval((val = item) => {
                                            const len = val.dataArray.length;
                                            if (len) {
                                                val.fn(val.dataArray.shift())
                                            } else {
                                                clearInterval(flag)
                                            }
                                        }, item.time)
                                    }
                                    else {
                                        item.fn(value)
                                    }
                                }
                            }
                        }
                        clearInterval(timer);
                    }
                }, 100)
            }
            this.socket.onerror = (e) => {
                if (this.onLine) {
                    Notification.error({
                        title: 'Connection Error!',
                        content: 'Trying to establish a connection ……, please  check the network connection and ensure you are in login status ',
                        duration: 10
                    })
                }
                this.onLine = false;
            }
        }
        if (!this.TIMER) {
            this.TIMER = setInterval(() => {
                this.send(this.heartBeat)
            }, 10000)
        }
        return
    },
    close: function () {
        if (this.socket) {
            this.socket.close();
            if (this.TIMER) {
                clearInterval(this.TIMER)
            }
        }
        this.socket = null;
        this.TIMER = null;
        return
    },

    /**
     * @memberOf module:utils/communition
     * @description                 向后台发送数据函数
     * @param  {String || }    type     发送类型为字符串 "{type: 'recon',action: 'query'}"
     * @tips                        添加监听函数后调用该函数主动发送 字符串"{type: 'recon',action: 'query'}"                               
     */
    send: function (value) {
        const type = typeof value;
        const data = type === 'object' ? JSON.stringify(value) : value;
        const messageType = JSON.parse(data).type
        if (this.socket && (this.socket.readyState === 1)) {
            this.socket.send(data);
            if (messageType in this.listeners) {
                this.listeners[messageType].dataArray = []
            }
        } else {
            if (this.socket && this.socket.readyState !== 1) {
                if (data !== this.heartBeat) {
                    this.sendBuffer.push(data);
                }
                setTimeout(() => {
                    if (this.socket && this.socket.readyState !== 1) {
                        this.socketInit()
                    }
                }, 5000)
            } else {
                if (!this.socket) {
                    this.socket = null;
                    this.socketInit();
                }
            }
        }
    },
    /**
     * @memberOf module:utils/communition
     * @description                 添加监听函数
     * @param  {String}    messageType     本次通信的类型
     * @param  {Function}  name     后台推送数据到达时的回调函数
     */
    addListener: function (messageType, func, delay) {
        this.listeners[messageType] = {
            fn: func,
            dataArray: [],
            time: delay 
        }
        if (!this.socket) {
            this.socketInit();
        }

    },
    /**
     * @memberOf module:utils/communition
     * @description                 移除监听函数
     * @param  {String}    type     本次通信的类型
     */
    removeListener: function (type) {
        // this.listeners[type] = undefined;
        delete this.listeners[type]
        if (this.socket) {
            this.send({ type, action: 'exit' })
        }
    }

}

export default communication




