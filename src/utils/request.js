import axios from 'axios'
import config from '../baseConfig'
import { RequestError, AuthFailed } from '../utils/errors'
import * as urls from '../dataSourceConfig'
import { env } from '../utils'
import { Message } from '@alifd/next'
import { store, actions } from '../redux'
import qs from 'qs'

/// 设置请求身份
axios.interceptors.request.use(config => {
    // 请求头携带身份
    const token = env.getToken()
    // config.headers.common['Authorization'] = 'Bearer ' + token
    config.headers.authorization = 'Bearer ' + token
    
    // 请求参数转换, 如果不转换后台拿不到数据
    if (config.method === 'post') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        config.transformRequest = [function (data, headers) {
            if (data instanceof FormData) {
                return data
            }
            return qs.stringify(data)
        }]
    }

    return config
})
axios.interceptors.response.use(function (config) {
    if (config.headers.authorization != null) {
        env.setToken(config.headers.authorization)
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

/**
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 10000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */
export default function request(options) {
    console.log(config.baseUrl + options.url)
    return new Promise((resolve, reject) => {
        let _option = {
            method: options.method,
            // url: config.baseUrl + options.url,
            url: options.url,
            timeout: 20000,
            // params: options.params ? options.params:options.data,
            params: options.params ? options.params:(options.method === 'get' ? options.data:null),
            data: options.data,
            headers: options.headers ? options.headers:null,
            withCredentials: true, // 是否携带cookie发起请求
            validateStatus: status => {
                return status >= 200 && status < 300
            }
        }
        // 显示菊花
        store.dispatch(actions.app.requesting(true))
        axios.request(_option).then(
            res => {
                // 隐藏菊花
                store.dispatch(actions.app.requesting(false))
                let data =
                    typeof res.data === 'object'
                        ? res.data
                        : JSON.parse(res.data)
                if (data.code === 0) {
                    data.valid = true
                } else {
                    data.valid = false
                }
                if (data.code === 401 || data.code == 11) { // 授权失败
                    window.location.href = '/#/user'
                }
                if (options.url === urls.signin.url && data.valid) {
                    // 本地储存
                    env.setUser(data.dataDict)
                    window.location.href = '/#/'
                }
                if (options.url === urls.signout.url) {
                    // 清除环境
                    env.clearUser()
                }
                resolve(data)
            },
            error => {
                // 隐藏菊花
                store.dispatch(actions.app.requesting(false))
                if (error.response) {
                    console.log(error.response.status)
                }

                if (error.response && error.response.status === 401) { // 授权失败
                    window.location.href = '/#/user'
                    let _error = new AuthFailed()
                    resolve({
                        code: _error.code,
                        msg: _error.msg,
                        valid: false
                    })
                }

                let _error = new RequestError()
                resolve({
                    code: _error.code,
                    msg: _error.msg,
                    valid: false
                })
            }
        )
    })
}

// import axios from 'axios'
// import { Message } from '@alifd/next'

// // Set baseUrl when debugging production url in dev mode
// // axios.baseUrl = '//xxxx.taobao.com';

// export default async function request(options) {
//     try {
//         const response = await axios(options)
//         const data = response.data
//         if (data.status === 'SUCCESS') {
//             return { response, data }
//         } else if (data.status === 'NOT_LOGIN') {
//             // 处理未登录逻辑
//             location.href = ''
//         } else {
//             throw new Error(data.message || '后端接口异常')
//         }
//     } catch (err) {
//         // 统一处理接口异常逻辑
//         Message.show({
//             type: 'error',
//             title: '错误消息',
//             content: err.message
//         })
//         console.error(err)
//         throw err
//     }
// }
