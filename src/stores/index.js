import Icestore from '@ice/store'
import userProfile from './userProfile'
import record from './record'

export const types = {
    'userProfile': 'userProfile',
    'record': 'record'
}

const icestore = new Icestore()
icestore.registerStore(types.userProfile, userProfile)
icestore.registerStore(types.record, record)

export default icestore
