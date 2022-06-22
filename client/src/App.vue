<script>
import navbar from "./components/navbar.vue";
export default {
  name: "App",
  components: {
    navbar,
  },
};
</script>

<template>
  <navbar />
  <router-view />
</template>

<style></style>
