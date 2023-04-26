// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getDoc, getFirestore, updateDoc, doc, query, orderBy, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFunctions } from 'firebase/functions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkr7wine224BLNHwZdhDs3oEl1d1yYfdI",
    authDomain: "codemib-proj2.firebaseapp.com",
    databaseURL: "https://codemib-proj2-default-rtdb.firebaseio.com",
    projectId: "codemib-proj2",
    storageBucket: "codemib-proj2.appspot.com",
    messagingSenderId: "56277489670",
    appId: "1:56277489670:web:234cf8a19b5f00b3028b87"
  }

// const db = getFirestore()
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app)
const storageRef = ref(storage);

export { app, auth, db, functions, storage, storageRef, GoogleAuthProvider, signInWithPopup, query, setDoc, orderBy, addDoc, getDoc, updateDoc, doc, collection, getDocs, uploadBytes, ref, getDownloadURL };
