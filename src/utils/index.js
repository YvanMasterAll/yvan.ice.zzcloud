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

    toDateString(date) {
        if (date) {
            return moment(date).format(this.format)
        }
        return moment().format(this.format)
    }

    toDate(ts) {
        return moment(ts)
    }
}

export const util = new Util()

/// 数据状态
util.state = {
    ON: "ON",
    OFF: "OFF",
    Cancel: "Cancel",
    Accept: "Accept",
    Deny: "Deny",
    Delete: "Delete",
    Complete: "Complete",
    Unread: "Unread",
    Read: "Read", 
    _ON: "正常",
    _OFF: "已关闭",
    _Cancel: "已失效",
    _Accept: "审核通过",
    _Deny: "审核拒绝",
    _Delete: "已删除",
    _Complete: "已完成",
    _Unread: "未读",
    _Read: "已读", 
    toStateString: function(state) {
        if (state === this.ON) { return { state: this._ON, color: "#41A716" } }
        if (state === this.OFF) { return { state: this._OFF, color: "#EB7E10" } }
        if (state === this.Cancel) { return { state: this._Cancel, color: "#EB7E10" } }
        if (state === this.Accept) { return { state: this._Accept, color: "#2E7DE0" } }
        if (state === this.Deny) { return { state: this._Deny, color: "#E72B00" } }
        if (state === this.Delete) { return { state: this._Delete, color: "#E72B00" } }
        if (state === this.Complete) { return { state: this._Complete, color: "#2E7DE0" } }
        if (state === this.Unread) { return { state: this._Unread, color: "#EABB06" } }
        if (state === this.Read) { return { state: this._Read, color: "#26DAD0" } } 
        return { state: "未知", color: "#FF6383" }
    }
}