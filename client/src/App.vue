<script>
import Navbar from "./components/navbar.vue";
import { mapState } from "pinia";
import { useMaarvelStore } from "./stores/marvel";

export default {
  name: "app",
  components: { Navbar },
  computed: {
    ...mapState(useMaarvelStore, ["isLogin"]),
  }
};
</script>

<template>
  <Navbar v-if="isLogin === true" />
  <RouterView />
</template>

<style></style>
