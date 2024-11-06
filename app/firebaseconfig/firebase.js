// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2Q_7ITvbx2X4L20DAoQglJklWWpCifI8",
  authDomain: "login-8f36f.firebaseapp.com",
  projectId: "login-8f36f",
  storageBucket: "login-8f36f.appspot.com",
  messagingSenderId: "679426525090",
  appId: "1:679426525090:web:802d95e7476ca9afb4d4fb",
  measurementId: "G-Y90GC59NH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);