import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import config from './baseConfig'

/// 引入默认全局样式
import '@alifd/next/reset.scss'
import './global.scss'
import { init } from '@/utils'
import test from './utils/test'
import { store } from './redux'
import FullLoading from './components/FullLoading'

/// 引入基础配置文件
import router from './router'
import LanguageProvider from './components/LocaleProvider'
import { getLocale, setLocale } from './utils/locale'

const locale = getLocale()
setLocale('zh-CN')
const ICE_CONTAINER = document.getElementById('ice-container')

if (!ICE_CONTAINER) {
    throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.')
}

/// 初始化方法
init()

/// 测试方法
test()

/// 当前环境
// global.env = 'dev'
global.env = 'pro'

/// 全局对象
global.config = config

/// 模拟数据
if (global.env !== 'pro') {
    console.log('mocking data is working...')
    require('@/utils/mock')
}

ReactDOM.render(
    <LanguageProvider locale={locale}>
        <Provider store={store}>
            <FullLoading/>
            {router()}
        </Provider>
    </LanguageProvider>,
    ICE_CONTAINER
)