import * as types from './types'

const initialState = {
    records: {}
}

export const actions = { 
    record_list: (list) => ({type: types.record_list, records: list})
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.record_list:
            return {...state, records: action.records}
        default: 
            return state
    }
}