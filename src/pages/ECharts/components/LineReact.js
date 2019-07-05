/**
 * Created by yongyuehuang on 2017/8/5.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'

export default class LineReact extends React.Component {
    constructor(props) {
        super(props)
        this.initPie = this.initPie.bind(this)
    }

    initPie() {
        const { option = {} } = this.props //外部传入的data数据
        this.myChart = echarts.init(this.ID) //初始化echarts

        //设置options
        this.myChart.setOption(option)
    }

    onWindowResize() {
        console.log(111)
        this.myChart.resize()
    }

    componentDidMount() {
        this.initPie()
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    componentDidUpdate() {
        this.initPie()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize.bind(this))
    }

    render() {
        const { width = '100%', height = '300px' } = this.props
        return <div ref={ID => (this.ID = ID)} style={{ width, height }}></div>
    }
}
