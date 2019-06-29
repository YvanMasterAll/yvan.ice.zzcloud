import stores, { types } from '@/stores';

/// 全局函数

/// 初始化方法

export function init() {
    console.log('执行初始化方法')
    // test1()
    // test2()
}

function test1() {
    let record = stores.useStore(types.record)
    let { records } = record
    console.log(records)
    record.record_list(0)
}

function test2() {
    const io = require('socket.io-client')
    let socket = io('http://localhost:3001')
    socket.on('connect', function() {
        console.log('socket connect success.')

        this.send('来自客户端的消息')
        this.on('message', data => {
            console.log('服务端消息：',  data);
        })

        // this.on('getMsg', data => {
        //     console.log('服务端消息：',  data);
        // })

        // this.on('error', error => {
        //     console.log(error)
        // })

        // this.emit('send', 'hello');
    })
}

/// 本地存储

export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

export const getStore = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}
