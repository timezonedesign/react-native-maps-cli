import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

const config = {
//   apiKey: "AIzaSyBr-DLl-kGABLuYWNnXpJOe7GFrSHt-_Xw",
// 	authDomain: "emergy-53856.firebaseapp.com",
// 	databaseURL: "https://emergy-53856.firebaseio.com",
// 	projectId: "emergy-53856",
// 	storageBucket: "emergy-53856.appspot.com",
// 	messagingSenderId: "462297806018"
apiKey: "AIzaSyD-JRACXOkietemcw6PR_k05qjOSUJbuSY",
    authDomain: "emergy-19023.firebaseapp.com",
    databaseURL: "https://emergy-19023.firebaseio.com",
    projectId: "emergy-19023",
    storageBucket: "emergy-19023.appspot.com",
    messagingSenderId: "1003247353733"
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;