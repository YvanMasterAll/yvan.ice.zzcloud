var Mock = require('mockjs')
import * as urls from '../dataSourceConfig'

/// 用户登录
Mock.mock(urls.signin.url, function() {
    console.log('mockjs is working...')
    return {
        "dataDict": {
            "id": "2B0CE705-41E5-455F-94E4-61E483670A51",
            "expire": Math.ceil((new Date().getTime())/1000) + 60 * 60,
            // "expire": 1564632986.5374079,
            "username": "admin",
            "portrait": "http://ww1.sinaimg.cn/mw690/da2f588fgy1g5e8yeym3sj21mg12wtfu.jpg"
        },
        "msg": "请求成功",
        "code": 0
    }
})
