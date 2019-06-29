import axios from 'axios'
import config from '../baseConfig'
import {RequestError} from '../utils/errors'

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
            url: config.baseUrl + options.url,
            timeout: 10000,
            params: null,
            data: options.data,
            headers: null,
            withCredentials: true, //是否携带cookie发起请求
            validateStatus: (status)=> {
                return status >= 200 && status < 300
            },
        }
        axios.request(_option).then(res => {
            let data = typeof res.data === 'object'? res.data:JSON.parse(res.data)
            if (data.code === 200) { data.valid = true } else { data.valid = false }
            resolve(data)
        }, error => {
            console.log(error)
            let _error = new RequestError()
            resolve({
                code: _error.code,
                msg: _error.msg,
                valid: false
            })
        })
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