import { REQUEST_FILES, RECIEVE_FILES, FILTER_FILES } from './actions'

export default function reducer(state = {
    isFetching: false,
    files: [],
	filter: ''
}, action) {
    switch (action.type) {
        case REQUEST_FILES:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECIEVE_FILES:
            return Object.assign({}, state, {
                files: action.files,
                isFetching: false,
                lastUpdated: action.recievedAt
            })
		case FILTER_FILES:
			return Object.assign({}, state, {
				filter: action.filter
			})
        default:
            return state
    }
}

export const getFilteredFiles = (files, filter) => files.filter(file => {
    return file.name.toLowerCase().includes(filter.toLowerCase())
})
