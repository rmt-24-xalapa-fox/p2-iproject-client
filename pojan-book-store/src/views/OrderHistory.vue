<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
export default {
  name: "OrderHistory",
  components: {
    Navbar,
    HeroSection,
  },
  methods: {
    ...mapActions(useStore, ["readOrders"]),
  },
  created() {
    this.readOrders();
  },
};
</script>

<template>
  <div>
    <Navbar />
    <HeroSection title="Your Order History" />
  </div>
</template>

<style></style>
