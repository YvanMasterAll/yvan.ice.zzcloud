const urls = require('../src/dataSourceConfig')
import request from '../src/utils/request'
import config from '../src/baseConfig'
// 模拟数据
require('@/utils/mock')

it('signin test', function() {
    console.log(config.baseUrl + urls.signin.url)
    return request({
        // url: config.baseUrl + urls.signin.url,
        url: urls.signin.url,
        method: urls.signin.method,
        // data: { username: "admin", password: "123456" } //获取模拟数据不要带参数
    }).then(function(res) {
        console.log(res)
        // expect(res.code).toBe(0)
    })
})

