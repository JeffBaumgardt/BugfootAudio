import { REQUEST_FILES, RECIEVE_FILES, FILTER_FILES } from './actions'

export default function reducer(state = {
    isFetching: false,
    items: [],
	filter: ''
}, action) {
    switch (action.type) {
        case REQUEST_FILES:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECIEVE_FILES:
            return Object.assign({}, state, {
                items: action.files,
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
