import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore'
import { Provider } from 'react-redux'
import "semantic-ui-css/semantic.css";

let store = createStore()

let render = () => {
    const App = require('./App/App').default
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

if (module.hot) {
    const renderApp = render

    render = () => {
        try {
            renderApp()
        }
        catch(error) {
            console.error(error)
            throw error
        }
    }
	//
    // module.hot.accept('./App/App', () => {
    //     setTimeout(render)
    // })
}

render()
