import io from 'socket.io-client'
import { actions } from '../redux'

/// socket object
let socket = null

export const connect = function({ dispatch, getState }) {
    socket = io(config.socketUrl, {
        // 是否自动重新连接
        reconnection: true,
        // 自动重连10次后放弃
        reconnectionAttempts: 15,
        // 自动重连间隔时间
        reconnectionDelay: 3000,
        // 发送参数给服务器, 服务端获取参数socket.handshake.query
        // query: { accessToken }
    })

    socket.on('connect', function() {
        console.log('socket connect success.')

        this.on('channel', handleMessage)
    })

    // 如果断开了连接，尝试重新连接
    socket.on('disconnect', function() {
        console.log('socket has disconnect.')
    })
}

const handleMessage = message => {
    try {
        message = JSON.parse(message)
    } catch (err) {
        message = null
        console.log(err)
    }

    if (!message || !message.type) return

    const { type, data } = message

    switch (type) {
        // 借书记录
        case types.record:
            handleAction(actions.record_list, data)
            break
    }
}

const handleAction = function(action, params = null) {
    action(params)(dispatch, getState)
}

/// 关闭socket
export const close = () => {
    if (socket) {
        socket.close()
        socket = null
    }
}

/// 消息类型
export const types = {
    record: 'record'
}