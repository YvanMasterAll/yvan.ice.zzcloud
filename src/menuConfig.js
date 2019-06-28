// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
    {
        name: 'feedback',
        path: 'https://github.com/alibaba/ice',
        external: true,
        newWindow: true,
        icon: 'link',
    },
    {
        name: 'help',
        path: 'https://alibaba.github.io/ice',
        external: true,
        newWindow: true,
        icon: 'link',
    }
]

const asideMenuConfig = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'set',
        children: [
            {
                name: 'monitor',
                path: '/dashboard/monitor'
            }
        ]
    },
    {
        name: 'chart',
        path: '/chart',
        icon: 'set',
        children: [
            {
                name: 'basic',
                path: '/chart/basic'
            },
            {
                name: 'general',
                path: '/chart/general'
            }
        ]
    },
    {
        name: '表格页',
        path: '/table',
        icon: 'set',
        children: [
            {
                name: 'basic',
                path: '/table/basic'
                // authority: 'admin',
            },
            {
                name: 'general',
                path: '/table/general'
                // authority: 'user',
            }
        ]
    },
    {
        name: '列表页',
        path: '/list',
        icon: 'set',
        children: [
            {
                name: 'basic',
                path: '/list/basic'
            },
            {
                name: 'general',
                path: '/list/general'
            }
        ]
    },
    {
        name: 'profile',
        path: '/profile',
        icon: 'set',
        children: [
            {
                name: 'basic',
                path: '/profile/basic'
            },
            {
                name: 'terms',
                path: '/profile/general'
            }
        ]
    },
    {
        name: 'result',
        path: '/result',
        icon: 'set',
        children: [
            {
                name: 'success',
                path: '/result/success'
            },
            {
                name: 'fail',
                path: '/result/fail'
            }
        ]
    },
    {
        name: 'account',
        path: '/account',
        icon: 'set',
        children: [
            {
                name: 'setting',
                path: '/account/setting'
            }
        ]
    },
    {
        name: 'exception',
        path: '/exception',
        icon: 'set',
        children: [
            {
                name: '204',
                path: '/exception/204'
            },
            {
                name: '403',
                path: '/exception/403'
            },
            {
                name: '404',
                path: '/exception/404'
            },
            {
                name: '500',
                path: '/exception/500'
            }
        ]
    }
]

export { headerMenuConfig, asideMenuConfig }
