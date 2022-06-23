import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { ref, onUnmounted, computed } from "vue";

firebase.initializeApp({
  apiKey: "AIzaSyApo6JJ4dJm2YiBXNxreVzLJeirhQH2hvA",
  authDomain: "potree-chat.firebaseapp.com",
  projectId: "potree-chat",
  storageBucket: "potree-chat.appspot.com",
  messagingSenderId: "213012896179",
  appId: "1:213012896179:web:cf6efcda68d6285a8c13c6",
});

const firestore = firebase.firestore();
const messagesCollection = firestore.collection("messages");
const messagesQuery = messagesCollection
  .orderBy("createdAt", "desc")
  .limit(100);

export function useChat() {
  const messages = ref([]);
  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const sendMessage = (text) => {
    messagesCollection.add({
      userName: localStorage.getItem("username"),
      userId: localStorage.getItem("id"),
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}
