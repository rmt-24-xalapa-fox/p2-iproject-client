<script>
import { mapActions } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
export default {
  components: {
    RouterView,
  },
<<<<<<< HEAD
  // methods: {
  //   ...mapActions(useCounterStore, ["allTour"]),
  // },
  // async created() {
  //   await this.allTour();
  // },
=======
  methods: {
    ...mapActions(useCounterStore, ["fetchData"]),
  },
  async created() {
    await this.fetchData();
  },
>>>>>>> mapView
};
</script>
<template>
  <RouterView />
</template>

<style></style>
