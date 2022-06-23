<script>
import { useChat } from "@/firebase";
import { ref, watch, nextTick } from "vue";

export default {
  name: "ChatBox",
  props: {
    name: { type: String, default: "" },
    sender: { type: Boolean, default: false },
  },
  setup() {
    const { messages, sendMessage } = useChat();

    const bottom = ref(null);
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: "smooth" });
        });
      },
      { deep: true }
    );
    const message = ref("");
    const send = () => {
      sendMessage(message.value);
      message.value = "";
    };
    return { messages, bottom, message, send };
  },
};
</script>

<template>
  <div class="content">
    <div class="card card-content" style="height: 100%; width: 100%">
      <div class="chat-content">
        <div
          v-for="{ id, text, userName, userId } in messages"
          :key="id"
          :name="userName"
          :sender="userId"
          class="d-flex flex-row chat-text"
        >
         @{{userName}}: {{ text }}
        </div>
      </div>
    </div>
    <div class="input-group mb-3">
      <input
        v-model="message"
        type="text"
        class="form-control shadow-none input-text"
        style="border-color: black"
      />
      <div class="input-group-append">
        <button @click.prevent="send" class="btn button" type="button">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 80vh;
  /* background-color: gray; */
  width: 40%;
  padding: 20px;
  /* flex-wrap: wrap;
  overflow-y: auto; */
}

::-webkit-scrollbar {
  width: 0;
}

.card-content {
  flex-wrap: wrap;
  overflow-y: auto;
  border-bottom-right-radius: 0%;
  border-bottom-left-radius: 0%;
}

.chat-content {
  /* background-color: red; */
  height: 100%;
  flex-wrap: wrap;
  overflow-y: auto;
}

.chat-text {
    background-color: #363434;
    color: white;
    margin: 10px;
    padding: 5px;
    width: max-content;
    border-radius: 5px;
}

.input-text {
  border-top-left-radius: 0%;
}

.button {
  transition-duration: 0.5s;
  background-color: white;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  color: #292828;
  border-color: #292828;
  border-top-left-radius: 0%;
  border-top-right-radius: 0%;
  border-bottom-left-radius: 0%;
}

.button:hover {
  background-color: #292828; /* Green */
  color: white;
  border: none;
}
</style>
