import React, { useState } from 'react'
import styles from './index.module.scss'

const Sort_DATA = [
    {
        selected: '默认',
        label: '排序',
        value: ['默认', '综合', '时间', '状态']
    }
]

export default function FilterTag(props) {
    const [data, setData] = useState(Sort_DATA)

    async function handleClick(value, index) {
        let _data = Object.assign([], data)
        _data[index].selected = value
        setData(_data)
        // props.onChange()
    }

    return (
        <div className={styles.filterContent}>
            {data.map((item, index) => {
                const lastItem = index === data.length - 1
                const lastItemStyle = lastItem ? { marginBottom: 10 } : null
                return (
                    <div
                        className={styles.filterItem}
                        // style={lastItemStyle}
                        key={index}
                    >
                        <div className={styles.filterLabel}>{item.label}:</div>
                        <div className={styles.filterList}>
                            {item.value.map((text, idx) => {
                                const activeStyle =
                                    item.selected === text
                                        ? styles.activeText
                                        : styles.filterText
                                return (
                                    <span
                                        onClick={() => handleClick(text, index)}
                                        className={activeStyle}
                                        key={idx}
                                    >
                                        {text}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
