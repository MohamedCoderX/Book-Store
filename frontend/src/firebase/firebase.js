// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOK1xl0QXr9vbOd4pBXIL2ebKe4GfD0DY",
  authDomain: "book-store-c965c.firebaseapp.com",
  projectId: "book-store-c965c",
  storageBucket: "book-store-c965c.firebasestorage.app",
  messagingSenderId: "455883118224",
  appId: "1:455883118224:web:d4b77288c2c19369a46a15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);