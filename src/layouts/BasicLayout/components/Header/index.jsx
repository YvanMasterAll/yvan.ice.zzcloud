/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { useEffect } from 'react'
import { Balloon, Nav, Message, Button, Icon } from '@alifd/next'
import IceImg from '@icedesign/img'
import Layout from '@icedesign/layout'
import FoundationSymbol from '@icedesign/foundation-symbol'
import cx from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { headerMenuConfig } from '@/menuConfig'
import stores from '@/stores/index'
import SelectLang from '@/components/SelectLang'
import Logo from '../Logo'

import styles from './index.module.scss'

/// 临时状态
let _isMobile = null

function Header(props) {
    const userProfile = stores.useStore('userProfile')

    function getLocaleKey(item) {
        return `app.header.${item.name}`
    }

    function handleSetting() {
        props.history.push('/account/setting')
    }

    async function handleLogout() {
        try {
            userProfile.logout(() => {
                Message.success('已登出')
                props.history.push('/user/login')
            })
        } catch (err) {
            console.log(err)
        }
    }

    const {
        isMobile,
        className,
        style,
        intl: { formatMessage },
        collapse,
        setCollapse
    } = props

    const { userinfo, fetchData } = userProfile
    const { name, department, avatar } = userinfo

    useEffect(() => {
        fetchData()
    }, [])

    if (isMobile && _isMobile !== isMobile) {
        setTimeout(() => { setCollapse(true) }, 0)
    } 
    if (!isMobile && _isMobile !== isMobile) {
        setTimeout(() => { setCollapse(false) }, 0)
    } 
    _isMobile = isMobile
    
    return (
        <Layout.Header
            theme="dark"
            className={`${styles.iceDesignLayoutHeader} ${className}`}
            style={{ ...style }}
        >
            <div style={{ width: collapse ? 60 : 200, zIndex: 1, height: 60, boxShadow: '0 1px 9px -3px rgba(0,0,0,.2)', backgroundColor: '#fff', transition: 'all .2s ease-out' }}>
                <Logo collapse={collapse}/>
            </div>

            <div className={styles.iceDesignHeaderBar}>
                <div className={styles.asideBar} onClick={setCollapse}>
                    <img src={'../public/images/aside_bar.svg'} />
                </div>
            </div>
        </Layout.Header>
    )
}

export default injectIntl(withRouter(Header))
