// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, storageBucket } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrm8Qb10ohfU0I2fnWGYbMHkN2ZS8XQW8",
  authDomain: "blog-46e26.firebaseapp.com",
  projectId: "blog-46e26",
  storageBucket: "blog-46e26.appspot.com",
  messagingSenderId: "1033160287757",
  appId: "1:1033160287757:web:c5b69d0c6bc0bdf57c1744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();