import React, { Component } from 'react';
import { Table, Message, Icon, Input } from 'semantic-ui-react'
import ReactAudioPlayer from 'react-audio-player'
import { connect } from 'react-redux'
import fetchAudioFiles from './API'
import { requestFiles, recieveFiles, filterFiles } from './actions'
import { getFilteredFiles } from './reducer'
import './AudioFile.css'

const ListItem = ({name, url}) => {
	return (
		<Table.Row>
			<Table.Cell>
				{name}
			</Table.Cell>
			<Table.Cell>
				<ReactAudioPlayer src={url} preload='none' />
			</Table.Cell>
		</Table.Row>
	)
}

class AudioTable extends Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
        this.clearFilter = this.clearFilter.bind(this)
        this.dispatchFilter = this.dispatchFilter.bind(this)
	}
    componentDidMount() {
        this.props.requestFiles()
		fetchAudioFiles().then(this.props.recieveFiles)
    }

	handleChange(e) {
        this.dispatchFilter(e.target.value)
	}

    clearFilter() {
        this.dispatchFilter('')
    }

    dispatchFilter(text) {
        this.props.updateFilter(text)
    }

	render() {
		if (this.props.loading) {
			return (
				<Message icon>
					<Icon name="circle notched" loading />
					<Message.Content>
						<Message.Header>Loading...</Message.Header>
					</Message.Content>
				</Message>
			)
		}

		return (
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan='2'>
							<span className='fleft'>BugFoot Audio Files</span>
							<Input
                                icon
                                size='small'
                                placeholder="Filter..."
                                className='fright'
                                onChange={this.handleChange}
                            >
                                <input value={this.props.filter} />
                                <Icon name={this.props.filter.length > 0 ? 'remove circle' : 'search'} link onClick={this.clearFilter}/>
                            </Input>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
                <Table.Body>
        			{this.props.files.map(file =>
                        <ListItem key={file.id} name={file.name} url={file.uri}/>
                    )}
        		</Table.Body>
			</Table>
		);
	}
}

const mapStateToProps = (state) => {
    const { audio } = state
    return {
        files: getFilteredFiles(audio.files, audio.filter),
		loading: state.audio.isFetching,
        filter: state.audio.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (text) => {
            dispatch(filterFiles(text))
        },
        requestFiles: () => {
            dispatch(requestFiles())
        },
        recieveFiles: (files) => {
            dispatch(recieveFiles(files))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioTable)
