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
    ON: "ON",               _ON: "正常",
    OFF: "OFF",             _OFF: "已关闭",
    Cancel: "Cancel",       _Cancel: "已失效",
    Accept: "Accept",       _Accept: "审核通过",
    Deny: "Deny",           _Deny: "审核拒绝",
    Delete: "Delete",       _Delete: "已删除",
    Complete: "Complete",   _Complete: "已完成",
    Unread: "Unread",       _Unread: "未读",
    Read: "Read",           _Read: "已读", 
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

/// 动态类型
util.trend_type = {
    AddCommit: "AddCommit",             _AddCommit: "提交Commit",
    AddIssue: "AddIssue",               _AddIssue: "提交Issue",
    HadNewCommit: "HadNewCommit",       _HadNewCommit: "新添Commit",
    HadNewIssue: "HadNewIssue",         _HadNewIssue: "新添Issue",
    CommitAccepted: "CommitAccepted",   _CommitAccepted: "Commit过审",
    CommitDeny: "CommitDeny",           _CommitDeny: "Commit被拒",
    IssueAccepted: "IssueAccepted",     _IssueAccepted: "Issue过审",
    IssueDeny: "IssueDeny",             _IssueDeny: "Issue被拒",
    toTypeString: function(type) {
        if (type === this.AddCommit) { return { type: this._AddCommit, color: "#41A716" } }
        if (type === this.AddIssue) { return { type: this._AddIssue, color: "#41A716" } }
        if (type === this.HadNewCommit) { return { type: this._HadNewCommit, color: "#2E7DE0" } }
        if (type === this.HadNewIssue) { return { type: this._HadNewIssue, color: "#2E7DE0" } }
        if (type === this.CommitAccepted) { return { type: this._CommitAccepted, color: "#2E7DE0" } }
        if (type === this.IssueAccepted) { return { type: this._IssueAccepted, color: "#2E7DE0" } }
        if (type === this.CommitDeny) { return { type: this._CommitDeny, color: "#E72B00" } }
        if (type === this.IssueDeny) { return { type: this._IssueDeny, color: "#E72B00" } }
        return { type: "未知", color: "#FF6383" }
    }
}