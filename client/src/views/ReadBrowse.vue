<script>
import Navbar from "../components/Navbar.vue";
import ReadBrowseContent from "../components/ReadBrowseContent.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    ReadBrowseContent,
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <ReadBrowseContent />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
