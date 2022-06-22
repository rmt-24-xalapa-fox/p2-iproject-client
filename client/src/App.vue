<script>
import Navbar from "./components/navbar.vue";
import Footer from "./components/footer.vue";

export default {
  name: "app",
  components: { Navbar, Footer },
};
</script>

<template>
  <Navbar />
  <RouterView />
  <!-- <Footer /> -->
</template>

<style></style>
