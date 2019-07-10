import { take, put, call, fork, all, takeLatest, takeEvery } from 'redux-saga/effects'
import * as types from './types'
import api from './api'

function* signin({payload}) {
    if (!payload) { return }
    let user = yield call(api.signin, payload)
    console.log(user)
    yield put({
        type: types.signin,
        user: user
    })
}

export default function* sagas() {
    yield all([
        takeLatest(types.signin, signin)
    ])
}

