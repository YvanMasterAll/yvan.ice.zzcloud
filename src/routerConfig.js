import React from 'react'

import UserLayout from '@/layouts/UserLayout'
import BasicLayout from '@/layouts/BasicLayout'

// const UserLogin     = React.lazy(() => import('@/pages/UserLogin'))
// const UserRegister  = React.lazy(() => import('@/pages/UserRegister'))
// const Dashboard     = React.lazy(() => import('@/pages/Dashboard'))
// const Charts        = React.lazy(() => import('@/pages/Charts'))
// const BasicCharts   = React.lazy(() => import('@/pages/BasicCharts'))
// const ECharts       = React.lazy(() => import('@/pages/ECharts'))
// const Terms         = React.lazy(() => import('@/pages/Terms'))
// const Result        = React.lazy(() => import('@/pages/Result'))
// const BasicList     = React.lazy(() => import('@/pages/BasicList'))
// const ProjectList   = React.lazy(() => import('@/pages/ProjectList'))
// const BasicTable    = React.lazy(() => import('@/pages/BasicTable'))
// const GeneralTable  = React.lazy(() => import('@/pages/GeneralTable'))
// const Profile       = React.lazy(() => import('@/pages/Profile'))
// const Setting       = React.lazy(() => import('@/pages/Setting'))
// const Fail          = React.lazy(() => import('@/pages/Fail'))
// const Empty         = React.lazy(() => import('@/pages/Empty'))
// const Forbidden     = React.lazy(() => import('@/pages/Forbidden'))
// const NotFound      = React.lazy(() => import('@/pages/NotFound'))
// const ServerError   = React.lazy(() => import('@/pages/ServerError'))

 import UserLogin from '@/pages/UserLogin'
 import UserRegister from '@/pages/UserRegister'
 import Dashboard from '@/pages/Dashboard'
 import Charts from '@/pages/Charts'
 import BasicCharts from '@/pages/BasicCharts'
 import ECharts from '@/pages/ECharts'
 import Terms from '@/pages/Terms'
 import Result from '@/pages/Result'
 import BasicList from '@/pages/BasicList'
 import ProjectList from '@/pages/ProjectList'
 import BasicTable from '@/pages/BasicTable'
 import GeneralTable from '@/pages/GeneralTable'
 import Profile from '@/pages/Profile'
 import Setting from '@/pages/Setting'
 import Fail from '@/pages/Fail'
 import Empty from '@/pages/Empty'
 import Forbidden from '@/pages/Forbidden'
 import NotFound from '@/pages/NotFound'
 import ServerError from '@/pages/ServerError'

/// 知识库列表
const Repositories  = React.lazy(() => import('@/pages/Repositories'))
const Commits       = React.lazy(() => import('@/pages/Commits'))
const Issues        = React.lazy(() => import('@/pages/Issues'))

/// 用户管理
const Users         = React.lazy(() => import('@/pages/Users'))
const Trends        = React.lazy(() => import('@/pages/Trends'))

const routerConfig = [
    {
        path: '/user',
        component: UserLayout,
        children: [
            {
                path: '/login',
                component: UserLogin
            },
            {
                path: '/register',
                component: UserRegister
            },
            {
                path: '/',
                redirect: '/user/login'
            },
            {
                component: NotFound
            }
        ]
    },
    {
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: '/repository',
                component: Repositories
            },
            {
                path: '/repository/edit',
                component: Repositories
            },
            {
                path: '/repository/add',
                component: Repositories
            },
            {
                path: '/commit',
                component: Commits
            },
            {
                path: '/commit/edit',
                component: Commits
            },
            {
                path: '/commit/add',
                component: Commits
            },
            {
                path: '/issue',
                component: Issues
            },
            {
                path: '/issue/edit',
                component: Issues
            },
            {
                path: '/issue/add',
                component: Issues
            },
            {
                path: '/users',
                component: Users
            },
            {
                path: '/users/edit',
                component: Users
            },
            {
                path: '/users/add',
                component: Users
            },
            {
                path: '/trend',
                component: Trends
            },
            {
                path: '/dashboard/monitor',
                component: Dashboard,
                pageload: false // 页面加载时是否重载
            },
            {
                path: '/chart/general',
                component: Charts,
                pageload: false // 页面加载时是否重载
            },
            {
                path: '/chart/basic',
                component: BasicCharts,
                pageload: false // 页面加载时是否重载
            },
            {
                path: '/chart/echarts',
                component: ECharts
            },
            {
                path: '/list/basic',
                component: BasicList
            },
            {
                path: '/list/general',
                component: ProjectList
            },
            {
                path: '/result/success',
                component: Result
            },
            {
                path: '/result/fail',
                component: Fail
            },
            {
                path: '/table/basic',
                component: BasicTable
            },
            {
                path: '/profile/basic',
                component: Profile
            },
            {
                path: '/profile/general',
                component: Terms
            },
            {
                path: '/table/general',
                component: GeneralTable
            },
            {
                path: '/account/setting',
                component: Setting
            },
            {
                path: '/exception/500',
                component: ServerError
            },
            {
                path: '/exception/403',
                component: Forbidden
            },
            {
                path: '/exception/204',
                component: Empty
            },
            {
                path: '/exception/404',
                component: NotFound
            },
            {
                path: '/',
                redirect: '/repository'
            },
            // {
            //     component: NotFound
            // }
        ]
    }
]

export default routerConfig
