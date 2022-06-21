<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
      NavBar
  }
}
</script>

<template>
  
  <NavBar />
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hahmlet&display=swap');
</style>
