export const REQUEST_FILES = "REQUEST_FILES"
export const RECIEVE_FILES = "RECIEVE_FILES"
export const FILTER_FILES  = "FILTER_FILES"

export function requestFiles() {
	return {
		type: REQUEST_FILES
	}
}

export function recieveFiles(files) {
	return {
		type: RECIEVE_FILES,
		files: Object.keys(files).map(file => {
                files[file].id = file
                return files[file]
        }),
        recievedAt: Date.now()
	}
}

export function filterFiles(filter) {
	return {
		type: FILTER_FILES,
		filter
	}
}
