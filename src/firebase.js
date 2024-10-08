// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyB7dsOytkfSbOvK7AYdV1oUIjUr8wF8X1Y",
  authDomain: "dropbox2-b9b80.firebaseapp.com",
  projectId: "dropbox2-b9b80",
  storageBucket: "dropbox2-b9b80.appspot.com",
  messagingSenderId: "996230340461",
  appId: "1:996230340461:web:9f37d052766a3bbf1c4464"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, storage, db };
