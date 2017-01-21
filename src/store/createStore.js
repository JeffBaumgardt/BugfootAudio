import { applyMiddleware, createStore, compose } from 'redux'
import makeRootReducer, { injectReducer } from './reducers'
import middleware from './middleware'

export default (initialState = {}) => {
	const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

	const store = createStore(
		makeRootReducer(),
		initialState,
		enhancer(
			applyMiddleware(...middleware)
		)
	)

	store.asyncReducers = {}
	store.injectReducer = (key, reducer) => injectReducer(store, { key, reducer })

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const reducers = require('./reducers').default
			store.replaceReducer(reducers(store.asyncReducers))
		})
	}

	return store
}
