import firebase from 'firebase'
firebase.initializeApp({
	databaseURL: 'https://brilliant-torch-9162.firebaseio.com/'
})

export default function fetchAudioFiles() {
	return firebase.database().ref('/files/').once('value').then(data => data.val())
}
