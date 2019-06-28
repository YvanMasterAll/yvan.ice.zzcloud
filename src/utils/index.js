import stores, { types } from '@/stores';

/// 全局函数

/// 初始化方法

export function init() {
    console.log('执行初始化方法')
    // test1()
}

function test1() {
    let record = stores.useStore(types.record)
    let { records } = record
    console.log(records)
    record.record_list(0)
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
