import React, { useState } from 'react'
import FoundationSymbol from '@icedesign/foundation-symbol'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Nav } from '@alifd/next'
import { FormattedMessage } from 'react-intl'
import { asideMenuConfig } from '@/menuConfig'
import FontAwesome from 'react-fontawesome'
import Logo from '../Logo'
import styles from './index.module.scss'

const SubNav = Nav.SubNav
const NavItem = Nav.Item

/**
 * menuConfig.js 的 name 属性和 locals/menu.js 的 key 进行对应
 * 在这里进行转换 path: '/chart/basic' => 'app.menu.chart.basic'
 */
function getLocaleKey(item) {
    return `app.menu${item.path.replace(/\//g, '.')}`
}

/**
 * 二级导航
 */
function getSubMenuOrItem(item, index) {
    if (item.children && item.children.some(child => child.name)) {
        const childrenItems = getNavMenuItems(item.children)
        if (childrenItems && childrenItems.length > 0) {
            return (
                <SubNav
                    key={index}
                    // openKeys={[index]}
                    // icon={item.icon ? item.icon : null}
                    icon={item.icon ? <FontAwesome name={item.icon} style={{width: 24, color: '#666666', textAlign: "center", fontSize: 16}} />:null}
                    label={
                        <span className="ice-menu-collapse-hide">
                            <FormattedMessage id={getLocaleKey(item)} />
                        </span>
                    }
                >
                    {childrenItems}
                </SubNav>
            )
        }
        return null
    }
    return (
        <NavItem 
            key={item.path}
            icon={item.icon ? <FontAwesome name={item.icon} style={{width: 24, color: '#666666', textAlign: "center", fontSize: 12}} />:null}
        >
            <Link to={item.path}>
                <FormattedMessage id={getLocaleKey(item)} />
            </Link>
            {/* <Link to={'/exception/403'}>
                <FormattedMessage id={getLocaleKey(item)} />
            </Link> */}
        </NavItem>
    )
}

/**
 * 获取菜单项数据
 */
function getNavMenuItems(menusData) {
    if (!menusData) {
        return []
    }

    return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map((item, index) => {
            return getSubMenuOrItem(item, index)
        })
}
/**
 * 获取默认展开菜单项
 */
function getDefaultOpenKeys(location = {}) {
    const { pathname } = location
    const menus = getNavMenuItems(asideMenuConfig)

    let openKeys = []
    if (Array.isArray(menus)) {
        asideMenuConfig.forEach((item, index) => {
            if (pathname.startsWith(item.path)) {
                openKeys = [`${index}`]
            }
        })
    }

    return openKeys
}

let loaded = false
const Aside = withRouter(props => {
    const defaultOpenKeys = getDefaultOpenKeys(props.location)
    const [openKeys, setOpenKeys] = useState(defaultOpenKeys)

    /**
     * 当前展开的菜单项
     */
    function onOpenChange(keys) {
        setOpenKeys(keys)
    }

    const {
        location: { pathname },
        isMobile,
        collapse,
        setCollaping,
        setCollapse
    } = props
    
    // 因为侧边栏折叠后会显示popup, 所以要执行一个回调, 取消popup显示
    setCollaping(() => { 
        if (!loaded) {
            loaded = true
        } else {
            setOpenKeys([])
        }
    })

    const collapseClassName = collapse ?  styles.collapse:''

    return (
        <div className={`${styles.iceDesignLayoutAside} ${styles.iceDesignProAside} ${collapseClassName}`}>
            <Nav
                style={{ width: collapse ? 60 : 180 }}
                mode={collapse ? 'popup' : 'inline'}
                iconOnly={collapse}
                hasArrow={!collapse}
                activeDirection={null}
                selectedKeys={[pathname]}
                openKeys={openKeys}
                defaultSelectedKeys={[pathname]}
                onOpen={onOpenChange}
                hasTooltip={true}
            >
                {getNavMenuItems(asideMenuConfig)}
            </Nav>
        </div>
    )
})

export default Aside
