import {createStore, bindActionCreators, applyMiddleware, compose, combineReducers} from 'redux';
import {createLogger} from 'redux-logger'
import * as record from './record';

//日志输出
const loggerMiddleware = createLogger()
const baseMiddleware = (store) => (next) => (action) => {
    action && next(action)
}

//中间件
const middleware = [ baseMiddleware, loggerMiddleware]

//扩展中间件
const extendedCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore)

//reducers
const reducer = combineReducers({
    record: record.reducer
})

//store
export const store = extendedCreateStore(reducer);

//actions
export const actions = {
    record: bindActionCreators(
        record.actions,
        store.dispatch
    )
}
