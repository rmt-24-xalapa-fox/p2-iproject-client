<script>
import Navbar from "../components/Navbar.vue";
import BrowseCard from "../components/BrowseCard.vue";
import BrowseContent from "../components/BrowseContent.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    BrowseContent,
    BrowseCard,
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <BrowseCard />
    <BrowseContent />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
