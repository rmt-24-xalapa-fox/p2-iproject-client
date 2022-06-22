<template>
  <Navbar />
  <router-view />
</template>

<script>
import { mapActions } from "pinia";
import Navbar from "./components/Navbar.vue";
import { useMainStore } from "./stores/main";
export default {
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(useMainStore, ["checkIsLogin"]),
  },
  created() {
    this.checkIsLogin();
  },
};
</script>

<style></style>
