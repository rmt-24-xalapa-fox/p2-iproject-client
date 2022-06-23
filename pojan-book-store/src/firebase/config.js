import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgNdd5ILF8wpRnN3JGRB7-2LxwgOp4Vb0",
  authDomain: "book-club-v2.firebaseapp.com",
  projectId: "book-club-v2",
  storageBucket: "book-club-v2.appspot.com",
  messagingSenderId: "1058447238300",
  appId: "1:1058447238300:web:dc6e147f6fb232879df959",
};

// init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
