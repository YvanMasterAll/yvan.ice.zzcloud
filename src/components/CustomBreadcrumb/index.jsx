import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Breadcrumb } from '@alifd/next'
import styles from './index.module.scss'
import { FormattedMessage } from 'react-intl'
import { asideMenuConfig } from '@/menuConfig'

/**
 * menuConfig.js 的 name 属性和 locals/menu.js 的 key 进行对应
 * 在这里进行转换 path: '/chart/basic' => 'app.menu.chart.basic'
 */
function getLocaleKey(item) {
    return `app.menu${item.path.replace(/\//g, '.')}`
}

/**
 * 获取默认展开菜单项
 */
function getDefaultOpenKeys(location = {}) {
    const { pathname } = location

    let openKeys = []
    asideMenuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
            openKeys.push({
                path: item.path,
                link: `/#${item.path}`,
                text: item.name
            })
            if (item.children) {
                item.children.forEach((sub, index) => {
                    if (pathname === sub.path) {
                        openKeys.push({
                            path: sub.path,
                            link: `/#${sub.path}`,
                            text: sub.name
                        })
                    }
                })
                openKeys[0] = {
                    path: item.children[0].path,
                    link: `/#${item.children[0].path}`,
                    text: openKeys[0].text
                }
            }
        }
    })

    return openKeys
}

const CustomBreadcrumb = withRouter(props => {
    const defaultOpenKeys = getDefaultOpenKeys(props.location)

    return (
        <div className={styles.container}>
            <Breadcrumb className={styles.breadcrumb}>
                {defaultOpenKeys.map((item, index) => {
                    const link = item.link ? { link: item.link } : {}
                    return (
                        <Breadcrumb.Item key={index} {...link}>
                            <FormattedMessage id={getLocaleKey(item)} />
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
})

export default CustomBreadcrumb