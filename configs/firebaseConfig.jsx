// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "webdev003-f07ed.firebaseapp.com",
  projectId: "webdev003-f07ed",
  storageBucket: "webdev003-f07ed.firebasestorage.app",
  messagingSenderId: "706573916389",
  appId: "1:706573916389:web:6213880f1af4878f481c0c",
  measurementId: "G-WZ585YLNSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const storage=getStorage(app)