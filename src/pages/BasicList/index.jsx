import React from 'react'
import { withAuth } from '@/components/Auth'
import Table from './components/Table'

function BasicList() {
    return (
        <div className="list-page">
            <Table />
        </div>
    )
}

export default BasicList
// export default withAuth({
//     authorities: [102, 204]
// })(BasicList)
