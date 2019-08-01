import stores, { types } from '@/stores'
import { store, actions } from '../redux'
import * as _types from '../redux/types'
import request from './request'
import axios from 'axios'
import * as urls from '../dataSourceConfig'
import { util } from '../utils'

function test() {
    // testIcestore()
    // testSocket
    // testRedux()
    testRepos()
    // testExample()
}

/// 简单测试
async function testExample() {
    let result = await request({
        method: urls.repos.method, 
        url: urls.repos.url + "/text/1", 
        data: {page: 2}
    })
    console.log(result)
}

/// 知识库接口
async function testRepos() {
    console.log(util.toDateString())
    let result = await request({
        method: urls.repos.method, 
        url: urls.repos.url, 
        data: {page: 1, title: '高考', etime: util.toDateString(), name: '电商狗-老李'}
    })

    console.log(result)
}

/// 测试飞冰提供的状态管理组件icestore
function testIcestore() {
    let record = stores.useStore(types.record)
    let { records } = record
    console.log(records)
    record.record_list(0)
}

/// 测试socket通信
function testSocket() {
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

/// 测试Redux
async function testRedux() {
    // 测试登录
    // store.dispatch({type: _types.signin, payload: {name: 'yi02', password: '123456'}})
    // console.log(env.getUser())
    // console.log(env.getToken())

    // 测试资源权限
    let result = await request({
        method: 'post', 
        url: '/api/student/add/yi'
    })
    console.log(result)

    // 测试全局菊花
    // setTimeout(() => {
    //     store.dispatch(actions.app.requesting(true))
    //     setTimeout(() => {
    //         store.dispatch(actions.app.requesting(false))
    //     }, 3000)
    // }, 3000)
}

export default test