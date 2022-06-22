<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/SideBar.vue";

export default {
  components: {
    RouterView,
    Navbar,
    Sidebar,
  },
};
</script>

<template>
  <Navbar />
  <router-view />
  <!-- <Sidebar /> -->
</template>

<style scoped></style>
