import React, { Component } from 'react';
import { Table, Message, Icon, Input } from 'semantic-ui-react'
import ReactAudioPlayer from 'react-audio-player'
import { connect } from 'react-redux'
import fetchAudioFiles from './API'
import { requestFiles, recieveFiles, filterFiles } from './actions'
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
	}
    componentDidMount() {
        this.props.dispatch(requestFiles())
		fetchAudioFiles().then((files) =>
			this.props.dispatch(recieveFiles(files))
		)
    }

	handleChange(e) {
		console.log(e.target.value)
        this.props.dispatch(filterFiles(e.target.value))
	}

    clearFilter() {
        this.props.dispatch(filterFiles(''))
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
    return {
        files: state.files.items.filter(item => item.name.toLowerCase().includes(state.files.filter.toLowerCase())),
		loading: state.files.isFetching,
        filter: state.files.filter
    }
}

export default connect(mapStateToProps)(AudioTable)
