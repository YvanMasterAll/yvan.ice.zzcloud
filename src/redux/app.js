import * as types from './types'

const initialState = {
    isRequesting: false //网络请求状态
}

export const actions = { 
    requesting: (state) => ({ type: types.requesting, isRequesting: state })
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.requesting:
            return {...state, isRequesting: action.isRequesting}
        default: 
            return state
    }
}