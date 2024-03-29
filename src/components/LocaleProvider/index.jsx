/* eslint camelcase:0 */
import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'
import { ConfigProvider } from '@alifd/next'

// 引入 react-intl 多语言包
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

// 引入基础组件的语言包
import enUS from '@alifd/next/lib/locale/en-us'
import zhCN from '@alifd/next/lib/locale/zh-cn'

// 引入 locale 配置文件
import en_US from '@/locales/en-US'
import zh_CN from '@/locales/zh-CN'

// 设置语言包
addLocaleData([...en, ...zh])

const localeInfo = {
    'zh-CN': {
        nextLocale: zhCN,
        appLocale: 'zh',
        appMessages: zh_CN
    },
    'en-US': {
        nextLocale: enUS,
        appLocale: 'en',
        appMessages: en_US
    }
}

function LocaleProvider(props) {
    const { locale, children } = props

    const myLocale = localeInfo[locale]
        ? localeInfo[locale]
        : localeInfo['en-US']

    return (
        <IntlProvider
            locale={myLocale.appLocale}
            messages={myLocale.appMessages}
        >
            <ConfigProvider locale={myLocale.nextLocale}>
                {React.Children.only(children)}
            </ConfigProvider>
        </IntlProvider>
    )
}

LocaleProvider.propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
}

export default LocaleProvider
