<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<template>
  <Navbar v-if="$route.name!='login' && $route.name!='register' "/>
  <router-view></router-view>
</template>

<style></style>
