import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCuJlzmNyOXjJ7lGxkx3bNGkb6HZASnU58",
  authDomain: "whatsapp-clone-24bd0.firebaseapp.com",
  projectId: "whatsapp-clone-24bd0",
  storageBucket: "whatsapp-clone-24bd0.appspot.com",
  messagingSenderId: "408976089383",
  appId: "1:408976089383:web:ea5eae057ba60660a48902"
};

//serverside
const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  :firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider};