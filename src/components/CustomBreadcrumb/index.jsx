import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Breadcrumb } from '@alifd/next'
import styles from './index.module.scss'
import { asideMenuConfig } from '@/menuConfig'

/**
 * 获取默认展开菜单项
 */
function getDefaultOpenKeys(location = {}) {
    const { pathname } = location

    let openKeys = []
    asideMenuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
            openKeys.push({
                link: `/#${item.path}`,
                text: item.name
            })
            if (item.children) {
                item.children.forEach((sub, index) => {
                    if (pathname === sub.path) {
                        openKeys.push({
                            link: `/#${sub.path}`,
                            text: sub.name
                        })
                    }
                })
                openKeys[0] = {
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
                            {item.text}
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
})

export default CustomBreadcrumb