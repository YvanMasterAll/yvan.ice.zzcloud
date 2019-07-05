import React from 'react'
import asyncComponent from './AsyncComponent'
import { pieOption, barOption, lineOption, scatterOption, mapOption, radarOption, candlestickOption } from './options'
import IceContainer from '@icedesign/container'
import { Grid } from '@alifd/next'
const BarReact = asyncComponent(() => import('./components/BarReact'))                  // 柱状图组件
const PieReact = asyncComponent(() => import('./components/PieReact'))                 // 饼图组件
const LineReact = asyncComponent(() => import('./components/LineReact'))               // 折线图组件
const ScatterReact = asyncComponent(() => import('./components/ScatterReact'))         // 散点图组件
const MapReact = asyncComponent(() => import('./components/MapReact'))                 // 地图组件
const RadarReact = asyncComponent(() => import('./components/RadarReact'))             // 雷达图组件
const CandlestickReact = asyncComponent(() => import('./components/CandlestickReact')) // k线图组件

const { Row, Col } = Grid

export default function Charts() {
    return (
        <div className="echarts-page">
            <IceContainer>
                <BarReact option={barOption} />
            </IceContainer>
            <IceContainer>
                <PieReact option={pieOption} />
            </IceContainer>
            <IceContainer>
                <LineReact option={lineOption} />
            </IceContainer>
            <IceContainer>
                <ScatterReact option={scatterOption} />
            </IceContainer>
            <IceContainer>
                <MapReact option={mapOption} height="558px" />
            </IceContainer>
            <IceContainer>
                <RadarReact option={radarOption} />
            </IceContainer>
            <IceContainer>
                <CandlestickReact option={candlestickOption} />
            </IceContainer>
        </div>
    )
}
