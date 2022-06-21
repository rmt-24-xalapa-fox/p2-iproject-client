<script>
import Navbar from "../components/Navbar.vue";
import ReadContent from "../components/ReadContent.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    ReadContent,
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <ReadContent />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
