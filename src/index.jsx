import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import config from './baseConfig'

/// 引入默认全局样式
import '@alifd/next/reset.scss'
import './global.scss'
import { init } from '@/utils'
import { store } from './redux'

/// 引入基础配置文件
import router from './router'
import LanguageProvider from './components/LocaleProvider'
import { getLocale } from './utils/locale'

const locale = getLocale()
const ICE_CONTAINER = document.getElementById('ice-container')

if (!ICE_CONTAINER) {
    throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.')
}

/// 初始化方法
init()

/// 全局对象
global.config = config

ReactDOM.render(
    <LanguageProvider locale={locale}>
        <Provider store={store}>
            {router()}
        </Provider>
    </LanguageProvider>,
    ICE_CONTAINER
)