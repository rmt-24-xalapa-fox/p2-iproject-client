import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC-3oiyQY3k0FdKnbu2-WiNMy0_kR0IvJE",
    authDomain: "chat-app-yoga.firebaseapp.com",
    projectId: "chat-app-yoga",
    storageBucket: "chat-app-yoga.appspot.com",
    messagingSenderId: "553639271253",
    appId: "1:553639271253:web:1703ed73b6b9b17002eddc",
    measurementId: "G-ZBMPX8C1BD",
    storageBucket: "gs://chat-app-yoga.appspot.com"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);