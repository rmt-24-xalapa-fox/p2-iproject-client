<script>
import Navbar from "../components/Navbar.vue";
import Content from "../components/Content.vue";
import AddCard from "../components/AddCard.vue";


export default {
  name: "Home",
  components: {
    Navbar,
    Content,
    AddCard
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <AddCard/>
    <Content />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
