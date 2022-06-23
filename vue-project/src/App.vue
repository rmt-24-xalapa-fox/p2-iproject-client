<script>
import { mapActions } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
export default {
  components: {
    RouterView,
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchData"]),
  },
  async created() {
    await this.fetchData();
  },
};
</script>
<template>
  <RouterView />
</template>

<style></style>
