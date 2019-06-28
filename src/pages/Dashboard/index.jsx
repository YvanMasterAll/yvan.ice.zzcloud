import React, { useEffect } from 'react'
import Overivew from './components/Overivew'
import TabChart from './components/TabChart'
import EditableTable from './components/EditableTable'
import LatestActivity from './components/LatestActivity'
import ProjectAnalysis from './components/ProjectAnalysis'
import PieDoughnutChart from './components/PieDoughnutChart'
import stores, { types } from '@/stores'

export default function Dashboard() {
    let record = stores.useStore(types.record)
    let { records } = record
    console.log(records)

    useEffect(() => {
        // record.record_list(0)
    }, [])

    return (
        <div className="dashboard-page">
            <Overivew />
            <TabChart />
            <LatestActivity />
            <ProjectAnalysis />
            <EditableTable />
            <PieDoughnutChart />
        </div>
    )
}
