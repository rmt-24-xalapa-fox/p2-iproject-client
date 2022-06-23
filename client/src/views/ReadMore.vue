<script>
import Navbar from "../components/Navbar.vue";
import ReadContent from "../components/ReadContent.vue";
import ChatBox from "../components/ChatBox.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    ReadContent,
    ChatBox,
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <ReadContent />
    <ChatBox />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
