import request from '../utils/request'
import * as urls from '../dataSourceConfig'

class API {
  
    /// 登录
    async signin(data) {
        return await request({
            method: urls.signin.method, 
            url: urls.signin.url,
            data: data
        })
    }
}

export default new API()