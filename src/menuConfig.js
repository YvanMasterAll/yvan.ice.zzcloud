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
        name: 'Repository',
        path: '/repository',
        icon: 'apple'
    },
    {
        name: 'Commit',
        path: '/commit',
        icon: 'envira'
    },
    {
        name: 'Issue',
        path: '/issue',
        icon: 'envira'
    },
    {
        name: 'User',
        path: '/users',
        icon: 'modx'
    },
    {
        name: 'Trend',
        path: '/trend',
        icon: 'signal'
    },
    // {
    //     name: 'Dashboard',
    //     path: '/dashboard',
    //     icon: 'apple',
    //     children: [
    //         {
    //             name: 'monitor',
    //             path: '/dashboard/monitor',
    //             icon: 'vcard'
    //         }
    //     ]
    // },
    // {
    //     name: 'chart',
    //     path: '/chart',
    //     icon: 'angellist',
    //     children: [
    //         {
    //             name: 'basic',
    //             path: '/chart/basic',
    //             icon: 'amazon'
    //         },
    //         {
    //             name: 'general',
    //             path: '/chart/general',
    //             icon: 'houzz'
    //         },
    //         {
    //             name: 'echarts',
    //             path: '/chart/echarts',
    //             icon: 'bar-chart'
    //         }
    //     ]
    // },
    // {
    //     name: '表格页',
    //     path: '/table',
    //     icon: 'adn',
    //     children: [
    //         {
    //             name: 'basic',
    //             path: '/table/basic',
    //             // authority: 'admin',
    //             icon: 'modx'
    //         },
    //         {
    //             name: 'general',
    //             path: '/table/general',
    //             // authority: 'user',
    //             icon: 'usb'
    //         }
    //     ]
    // },
    // {
    //     name: '列表页',
    //     path: '/list',
    //     icon: 'scribd',
    //     children: [
    //         {
    //             name: 'basic',
    //             path: '/list/basic',
    //             icon: 'hashtag'
    //         },
    //         {
    //             name: 'general',
    //             path: '/list/general',
    //             icon: 'gitlab'
    //         }
    //     ]
    // },
    // {
    //     name: 'profile',
    //     path: '/profile',
    //     icon: 'envira',
    //     children: [
    //         {
    //             name: 'basic',
    //             path: '/profile/basic',
    //             icon: 'braille'
    //         },
    //         {
    //             name: 'terms',
    //             path: '/profile/general',
    //             icon: 'blind'
    //         }
    //     ]
    // },
    // {
    //     name: 'result',
    //     path: '/result',
    //     icon: 'glide',
    //     children: [
    //         {
    //             name: 'success',
    //             path: '/result/success',
    //             icon: 'viadeo'
    //         },
    //         {
    //             name: 'fail',
    //             path: '/result/fail',
    //             icon: 'snapchat'
    //         }
    //     ]
    // },
    // {
    //     name: 'account',
    //     path: '/account',
    //     icon: 'signing',
    //     children: [
    //         {
    //             name: 'setting',
    //             path: '/account/setting',
    //             icon: 'linode'
    //         }
    //     ]
    // },
    // {
    //     name: 'exception',
    //     path: '/exception',
    //     icon: 'yoast',
    //     children: [
    //         {
    //             name: '204',
    //             path: '/exception/204',
    //             icon: 'pencil'
    //         },
    //         {
    //             name: '403',
    //             path: '/exception/403',
    //             icon: 'fast-backward'
    //         },
    //         {
    //             name: '404',
    //             path: '/exception/404',
    //             icon: 'film'
    //         },
    //         {
    //             name: '500',
    //             path: '/exception/500',
    //             icon: 'signal'
    //         }
    //     ]
    // }
]

export { headerMenuConfig, asideMenuConfig }
