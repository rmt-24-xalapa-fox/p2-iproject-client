<script>
import { db } from "@/firebase/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import swal from "sweetalert";
export default {
  name: "BookClub",
  components: {
    Navbar,
    HeroSection,
  },
  data() {
    return {
      formatDistanceToNow,
      theMessage: "",
      arrayOfMessages: [],
    };
  },
  methods: {
    async createMessage(string) {
      try {
        await addDoc(collection(db, "chats"), {
          message: string,
          user: localStorage.getItem("Username"),
          createdAt: new Date(),
        });
        this.theMessage = "";
        this.getMessage(db);
      } catch (err) {
        swal(err);
      }
    },
    async getMessage(db) {
      const chatCollections = collection(db, "chats");
      const chatSnapshot = await getDocs(chatCollections);
      const chatList = chatSnapshot.docs.map((doc) => doc.data());
      this.arrayOfMessages = chatList.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      return chatList;
    },
  },
  mounted() {
    const objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  },
  updated() {
    this.getMessage(db);
  },
  created() {
    this.getMessage(db);
  },
};
</script>
<template>
  <div>
    <Navbar /> <HeroSection title="Book Club" />

    <div class="book-club-container">
      <div id="chat-windows" class="chat-window">
        <div v-if="arrayOfMessages" id="messages" class="messages">
          <div v-for="doc in arrayOfMessages" :key="doc.id" class="single">
            <span class="created-at"
              >{{ formatDistanceToNow(doc.createdAt.toDate()) }} ago</span
            >
            <span class="name">{{ doc.user }}</span>
            <span class="message">{{ doc.message }}</span>
          </div>
        </div>
      </div>
      <form @submit.prevent="createMessage(theMessage)" action="">
        <input v-model="theMessage" placeholder="type your message here ..." />
        <button class="btn" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style></style>
