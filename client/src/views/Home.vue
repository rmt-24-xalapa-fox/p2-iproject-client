<script>
import Navbar from "../components/Navbar.vue";
import Content from "../components/Content.vue";
import AddCard from "../components/AddCard.vue";
import { mapActions } from "pinia";
import { usePoemStore } from "../stores/poem";

export default {
  name: "Home",
  components: {
    Navbar,
    Content,
    AddCard,
  },
  methods: {
    ...mapActions(usePoemStore, ["getPoem"]),
  },
  created() {
    this.getPoem();
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <AddCard />
    <Content />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
