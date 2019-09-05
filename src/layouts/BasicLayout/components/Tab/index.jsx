import React, { useState, useEffect } from 'react'
import { Tab } from '@alifd/next'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'
import styles from './index.module.scss'

function getLocaleKey(path) {
    return `app.menu${path.replace(/\//g, '.')}`
}

function _Tab(props) {
    const [lastKey, setLastKey] = useState(null)
    const [activeKey, setActiveKey] = useState(null)
    const [activeRoutes, setActiveRoutes] = useState([])

    // 路由
    let pathname = props.location.pathname

    // 路由组件
    let routes = props.routes.filter((route, idx) => {
        if (route.props.children && route.props.path) {
            return true
        }
        if (route.props.component && route.props.path) {
            return true
        }
        return false
    })
    let exroutes = props.routes.filter((route, idx) => {
        if (route.props.from || route.props.path === undefined) {
            return true
        }
        return false
    })

    // 多窗口路由
    let _route = routes.filter((route, idx) => {
        if (route.props.path === pathname) {
            return true
        }
        return false
    })

    if (_route.length !== 0 && !activeRoutes.find((route, idx) => route.props.path === pathname)) {
        activeRoutes.push(_route[0])
        // setActiveRoutes(_activeRoutes)
    }

    // 当前激活的窗口
    if (_route.length !== 0 && activeKey !== pathname) {
        setLastKey(activeKey)
        setActiveKey(_route[0].props.path)
    }

    function onChange(key) {
        props.history.push(key)
    }

    function onClick(key) {
        // props.history.push(key)
    }

    function onClose(key) {
        var _idx = -1
        activeRoutes.find((route, idx) => {
            if (route.props.path === key) {
                _idx = idx
                return true
            } else {
                return false
            }
        })
        if (_idx !== -1) {
            let _activeRoutes = Object.assign([], activeRoutes)
            _activeRoutes.splice(_idx, 1)
            setActiveRoutes(_activeRoutes)
            if (_activeRoutes.length === 0) {
                props.history.push('/')
            } else if (key === activeKey) {
                if (activeRoutes.find((route, idx) => route.props.path === lastKey)) {
                    props.history.push(lastKey)
                } else {
                    props.history.push(_activeRoutes[_activeRoutes.length - 1].props.path)
                }
            }
        }
    }

    const { intl } = props
    
    return (
        <div className={styles.tab}>
            {exroutes}
            <Tab
                shape="wrapped"
                size="small"
                activeKey={activeKey}
                onChange={onChange}
                onClose={onClose}
                onClick={onClick}
                >
                {activeRoutes.map((route, idx) => {
                    const {
                        path,
                    } = route.props
                    return <Tab.Item title={intl.formatMessage({id: getLocaleKey(path)})} closeable={true} key={path}>{route}</Tab.Item>
                })}
            </Tab>
        </div>
    )
}

export default injectIntl(withRouter(_Tab))