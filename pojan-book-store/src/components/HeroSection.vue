<script>
import { mapState } from "pinia";
import { useStore } from "@/stores/store";
export default {
  name: "HeroSection",
  props: ["title", "subtitle"],
  computed: {
    ...mapState(useStore, ["isLogin"]),
  },
};
</script>

<template>
  <div class="hero-section">
    <h1>{{ title }}</h1>
    <h3 v-if="isLogin">{{ subtitle }}</h3>
  </div>
</template>

<style></style>
