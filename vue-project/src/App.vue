<script>
import { mapActions } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
export default {
  components: {
    RouterView,
  },
  // methods: {
  //   ...mapActions(useCounterStore, ["allTour"]),
  // },
  // async created() {
  //   await this.allTour();
  // },
};
</script>
<template>
  <RouterView />
</template>

<style></style>
