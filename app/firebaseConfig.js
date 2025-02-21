import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL5RVoULCqV3rnuHFfyYY5yU0Uyxfpvo0",
  authDomain: "rishav-jain-portfolio-4f66f.firebaseapp.com",
  projectId: "rishav-jain-portfolio-4f66f",
  storageBucket: "rishav-jain-portfolio-4f66f.appspot.com",
  messagingSenderId: "40989286155",
  appId: "1:40989286155:web:a518d7ec0045b679310c0e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);