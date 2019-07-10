import * as types from './types'

const initialState = {
    user: {}
}

export const actions = { 
    signin: (user) => ({type: types.signin, user: user})
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.signin:
            return {...state, user: action.user}
        default: 
            return state
    }
}