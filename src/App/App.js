import React, { Component } from 'react'
import AudioTable from './AudioList/AudioTable'
import './App.css'

class App extends Component {
	render() {
		return (
            <div>
                <div className="listContainer">
        			<AudioTable />
                </div>
            </div>
		)
	}
}

export default App
