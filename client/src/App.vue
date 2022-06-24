<script>
import Navbar from "./components/navbar.vue";
import Footer from "./components/footer.vue";
import { mapState } from "pinia";
import { useMaarvelStore } from "./stores/marvel";

export default {
  name: "app",
  components: { Navbar, Footer },
  computed: {
    ...mapState(useMaarvelStore, ["isLogin"]),
  }
};
</script>

<template>
  <Navbar v-if="isLogin === true" />
  <RouterView />
  <!-- <Footer /> -->
</template>

<style></style>
