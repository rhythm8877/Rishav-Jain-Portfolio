import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL5RVoULCqV3rnuHFfyYY5yU0Uyxfpvo0",
  authDomain: "rishav-jain-portfolio-4f66f.firebaseapp.com",
  projectId: "rishav-jain-portfolio-4f66f",
  storageBucket: "rishav-jain-portfolio-4f66f.firebasestorage.app",
  messagingSenderId: "40989286155",
  appId: "1:40989286155:web:a518d7ec0045b679310c0e",
  measurementId: "G-K3LZZ07HMJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();