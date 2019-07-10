import {createStore, bindActionCreators, applyMiddleware, compose, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as record from './record'
import * as app from './app'
import sagas from './sagas'

// 异步处理
const sagaMiddleware = createSagaMiddleware()

// 日志输出
const loggerMiddleware = createLogger()
const baseMiddleware = (store) => (next) => (action) => {
    action && next(action)
}

// 中间件
const middleware = [ baseMiddleware, loggerMiddleware, sagaMiddleware]

// 扩展中间件
const extendedCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore)

// reducers
const reducer = combineReducers({
    record: record.reducer,
    app: app.reducer
})

// store
export const store = extendedCreateStore(reducer)

// actions
export const actions = {
    record: bindActionCreators(
        record.actions,
        store.dispatch
    ),
    app: bindActionCreators(
        app.actions,
        store.dispatch
    )
}
// 异步处理
sagaMiddleware.run(sagas)
