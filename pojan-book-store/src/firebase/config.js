import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQjIs75mWzGtxuESoY_L3ntNPFrnDLFVc",
  authDomain: "book-club-6a621.firebaseapp.com",
  projectId: "book-club-6a621",
  storageBucket: "book-club-6a621.appspot.com",
  messagingSenderId: "18753130520",
  appId: "1:18753130520:web:d7ab1879c1b51d5b26b36d",
};

// init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
