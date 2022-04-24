
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcwpt-BH0pwaSJAMbdxNacHivDHxFXHkM",
  authDomain: "popbymath.firebaseapp.com",
  projectId: "popbymath",
  storageBucket: "popbymath.appspot.com",
  messagingSenderId: "960426835022",
  appId: "1:960426835022:web:860288c5d30deb1191571f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)