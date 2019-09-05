import request from '@/utils/request'
<<<<<<< HEAD
import { userProfile, userLogout, userLogin } from '../dataSourceConfig'
=======
>>>>>>> 381ad446d233fdc99213b477b70bc13d9e5de787
import { signin, signout } from '../dataSourceConfig'

export default {
    userinfo: {
        name: '',
        department: '',
        avatar: ''
    },
    userid: '',

    async fetchData() {
        const data = await request(userProfile)
        if (data.valid) {
            const { name, department, avatar, userid } = data.data
            this.userinfo = { name, department, avatar }
            this.userid = userid
        }
    },

    async login(params, callback) {
        // const data = await request({
        //     ...userLogin,
        //     data: {
        //         ...userLogin.data,
        //         ...params
        //     }
        // })
        const data = await request({
            ...signin,
            data: {
                ...params
            }
        })
        if (callback) {
            callback(data)
        }
    },

    async logout(callback) {
        const data = await request(signout)
        if (callback) {
            callback(data)
        }
    }
}
