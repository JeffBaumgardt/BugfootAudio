import { middleware as reduxPack } from 'redux-pack'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const middleware = [ thunk, reduxPack, createLogger() ]

export default middleware
