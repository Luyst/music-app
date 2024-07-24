// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA1VdxoNOmF-H0tfFPGvlApY1hlu0ePrU8',
    authDomain: 'music-app-76b8c.firebaseapp.com',
    projectId: 'music-app-76b8c',
    storageBucket: 'music-app-76b8c.appspot.com',
    messagingSenderId: '148677253771',
    appId: '1:148677253771:web:b854225f0fd40c91bd128e',
    measurementId: 'G-QC6N7BKM1Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
