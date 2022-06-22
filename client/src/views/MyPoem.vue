<script>
import Navbar from "../components/Navbar.vue";
import AddCard from "../components/AddCard.vue";
import MyPoemContent from "../components/MyPoemContent.vue";

export default {
  name: "MyPoem",
  components: {
    Navbar,
    AddCard,
    MyPoemContent,
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <AddCard />
    <MyPoemContent />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
