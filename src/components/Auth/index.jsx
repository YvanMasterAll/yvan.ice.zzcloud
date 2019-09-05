import React from 'react'
import Exception from '@/components/Exception'
import cookie from 'cookie'
import { env } from '../../utils'

/// 权限类型
const ptype = {
    menu: 'menu',           // 菜单权限
    resource: 'resource',   // 资源权限
    feature: 'feature'      // 功能权限
}

const permissions = [
    {
        id: 101, name: '超管', type: ptype.feature // 具备管理所有用户的权力
    },
    {
        id: 102, name: '管理', type: ptype.feature // 具备管理成员的权力
    },
    {
        id: 201, name: '监控', type: ptype.menu
    },
    {
        id: 202, name: '图表', type: ptype.menu
    },
    {
        id: 203, name: '表格', type: ptype.menu
    },
    {
        id: 204, name: '列表', type: ptype.menu
    },
    {
        id: 205, name: '内容', type: ptype.menu
    },
    {
        id: 206, name: '结果', type: ptype.menu
    },
    {
        id: 207, name: '异常', type: ptype.menu
    }
]

/**
 * 权限组件，可控制页面或者组件
 * @param {authorities} 权限列表
 *
 * 控制页面例子：
 *     import React from 'react';
 *     import { withAuth } from '@/components/Auth';
 *     function BasicList() {
 *          return (
 *              <div className="list-page">
 *                  <Table />
 *              </div>
 *          );
 *     }
 *
 *     export default withAuth({
 *          authorities: ['admin', 'user'],
 *     })(BasicList);
 *
 * 控制组件例子：
 *     <Auth authorities={['admin', 'user']}>
 *          <Button>auth</Button>
 *     </Auth>
 */
const Auth = ({ children, authorities = [] }) => {
    // 服务端将authority保存在cookie中, 前端只负责取cookie
    // const { authority } = cookie.parse(document.cookie)

    // 获取用户的权限
    let user = env.getUser()
    let perms = user.perms
    let pass = true

    authorities.forEach(p => {
        if (perms.includes(p)) {
            return
        }
        pass = false
    })

    if (!pass) {
        // 也可以跳转到统一的无权限页面，具体看业务需求
        return (
            <Exception
                statusCode="403"
                description="抱歉, 你没有权限访问该页面"
            />
        )
    }

    return children
}

const withAuth = params => WrapperedComponent => {
    return props => {
        return (
            <Auth {...params}>
                <WrapperedComponent {...props} />
            </Auth>
        )
    }
}

/// 检查token是否过时
const authCheck = function() {
<<<<<<< HEAD
    // let user = env.getUser()
    // if (!user) { return false }
    
    // let token = user.token
    // let expire = token.exp
    // let now = Math.ceil((new Date().getTime())/1000)
    // if (now > expire) {
    //     return false
    // }
=======
    // 测试阶段直接返回true
    // if (global.env !== 'pro') {
    //     return true
    // }

    let user = env.getUser()
    if (!user) { return false }

    // 将user放入全局
    global.user = user

    let expire = user.expire
    if (!expire) { return false }

    let now = Math.ceil((new Date().getTime())/1000)
    if (now > expire) {
        return false
    }
>>>>>>> 381ad446d233fdc99213b477b70bc13d9e5de787

    return true
}

export { withAuth, authCheck }

export default Auth

