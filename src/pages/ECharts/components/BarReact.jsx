import React, { useState, useEffect } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'

export default function BarReact(props) {
    let _ID = null

    function initPie() {
        const { option={} } = props    // 外部传入的data数据
        let myChart = echarts.init(_ID) // 初始化echarts
    
        // 设置options
        myChart.setOption(option)
        window.onresize = function() {
            myChart.resize()
        }
    }

    const { width="100%", height="200px"} = props

    useEffect(() => {
        initPie()
    }, [])

    return (
        <div ref={ID => _ID = ID} style={{width, height}}>
        </div>
    )
}