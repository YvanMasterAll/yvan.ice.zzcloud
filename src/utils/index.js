var moment = require('moment')

/// 全局函数

/// 初始化方法

export function init() {
    console.log('执行初始化方法')
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

export const removeStore = name => {
    if (!name) return
    return window.localStorage.removeItem(name)
}

/// 本地环境

class Env {
    constructor() {

    }

    setUser(data) {
        setStore('user', data)
    }

    getUser() {
        return JSON.parse(getStore('user'))
    }

    setToken(data) {
        setStore('token', data)
    }

    getToken() {
        return getStore('token')
    }

    clearUser() {
        return removeStore('user')
    }

    tokenValid() {

    }
}

export const env = new Env()

/// 扩展工具
class Util {
    constructor() {
        this.format = "YYYY-MM-DD HH:mm:ss"
    }

    now() {
        return moment().format(this.format)
    }

    toDateString() {
        return moment().format(this.format)
    }

    toDate(ts) {
        return moment(ts)
    }
}

export const util = new Util()