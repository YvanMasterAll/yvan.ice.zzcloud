import stores, { types } from '@/stores'
import { store, actions } from '../redux'
import * as _types from '../redux/types'
import request from './request'

function test() {
    // testIcestore()
    // testSocket
    testRedux()
}

/// 测试飞冰自带的状态管理组件
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
    store.dispatch({type: _types.signin, payload: {name: 'yi02', password: '123456'}})
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