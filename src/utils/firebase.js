/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcxRN4040O_oXepV4r5062MSKa-HcEFew",
  authDomain: "netflixgpt-abd3f.firebaseapp.com",
  projectId: "netflixgpt-abd3f",
  storageBucket: "netflixgpt-abd3f.firebasestorage.app",
  messagingSenderId: "626609198007",
  appId: "1:626609198007:web:d7d98916ade38eb05e4e32",
  measurementId: "G-NVBDEQ6K1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();