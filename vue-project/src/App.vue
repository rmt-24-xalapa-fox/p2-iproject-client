<script>
import { mapActions } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
export default {
  components: {
    RouterView,
  },
};
</script>
<template>
  <RouterView />
</template>

<style></style>
