import React from 'react'
import { Loading } from '@alifd/next'
import { connect } from 'react-redux'

const FullLoading = function (props) {

    if (!props.isRequesting) {
        return (null)
    }

    return (
        <div>
            <Loading fullScreen color="#fff" />
        </div>
    )
} 

const mapStateToProps = (state) => {
    return {
        isRequesting: state.app.isRequesting
    }
}

export default connect(
    mapStateToProps
)(FullLoading)