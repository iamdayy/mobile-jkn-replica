import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
// Check if apps are already initialized to prevent duplicate initialization errors in Expo
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
