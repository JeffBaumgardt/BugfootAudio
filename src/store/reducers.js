import { combineReducers } from 'redux'
import filesReducer from '../App/AudioList/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
      files: filesReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer}) => {
	if (!store.asyncReducers[key]) {
		console.log(`Injecting reducer: ${key}`)
		store.asyncReducers[key] = reducer
		store.replaceReducer(makeRootReducer(store.asyncReducers))
	}
}

export default makeRootReducer
