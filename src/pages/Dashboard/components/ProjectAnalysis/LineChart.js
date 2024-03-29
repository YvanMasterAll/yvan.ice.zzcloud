/* eslint global-require: 0 */
import React from 'react'
import { Chart, Geom, Tooltip } from 'bizcharts'
import IceContainer from '@icedesign/container'
import { injectIntl } from 'react-intl'

function LineChart(props) {
    const {
        color,
        intl: { formatMessage }
    } = props

    const data = [
        { month: '1', income: 38 },
        { month: '2', income: 52 },
        { month: '3', income: 61 },
        { month: '4', income: 50 },
        { month: '5', income: 65 },
        { month: '6', income: 60 },
        { month: '7', income: 60 },
        { month: '8', income: 58 },
        { month: '9', income: 48 },
        { month: '10', income: 50 },
        { month: '11', income: 40 },
        { month: '12', income: 40 }
    ]
    const cols = {
        income: { tickInterval: 20 }
    }

    return (
        <IceContainer
            title={formatMessage({ id: 'app.dashboard.project.line.title' })}
        >
            <Chart
                height={74}
                forceFit
                padding={[10, 2, 2, 2]}
                data={data}
                scale={cols}
            >
                <Geom
                    type="area"
                    position="month*income"
                    color={color || '#2077ff'}
                    shape="smooth"
                />
                <Tooltip crosshairs={{ type: 'y' }} />
            </Chart>
        </IceContainer>
    )
}

export default injectIntl(LineChart)
