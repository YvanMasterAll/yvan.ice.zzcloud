import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

export default function Logo(props) {
    return (
        <div className={styles.logo}>
            <img src={'/images/logo.svg'} style={{marginRight: 10, width: 36}} />
            { !props.collapse && 
                <Link to="/" className={styles.logoTitle}>
                    <span className={styles.span}>知枢平台</span>
                </Link>
            }
        </div>
    )
}
