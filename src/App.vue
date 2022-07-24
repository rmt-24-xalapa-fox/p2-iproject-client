<template>
  <Navbar />
  <router-view />
</template>

<script>
import { mapActions, mapState } from "pinia";
import Navbar from "./components/Navbar.vue";
import { useMainStore } from "./stores/main";
export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState(useMainStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useMainStore, ["checkIsLogin", "readUser"]),
  },
  created() {
    this.checkIsLogin();
  },
};
</script>

<style></style>
