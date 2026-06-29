import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyASpwUMAICO3MzIWfKSNXCCJiBC4-WRBKU",
  authDomain: "himapp-45.firebaseapp.com",
  projectId: "himapp-45",
  storageBucket: "himapp-45.firebasestorage.app",
  messagingSenderId: "928563764915",
  appId: "1:928563764915:web:fc4286d5f96b73eb40dac6",
  measurementId: "G-RNLFTYY78F"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };
