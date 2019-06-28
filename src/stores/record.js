import request from '../utils/request'
import * as urls from '../dataSourceConfig'

export default {
    records: {},

    async record_list(page) {
        this.records = await request({
            method: urls.recordList.method, 
            url: `${urls.recordList.url}/${page}`
        })
    }
}
