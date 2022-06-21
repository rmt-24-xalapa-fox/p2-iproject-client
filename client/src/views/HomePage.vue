<script>
import ThePopularMovies from "../components/ThePopularMovies.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useMainStore } from "../stores/store";

export default {
  name: "HomePage",
  components: {
    ThePopularMovies,
  },
  computed: {
    ...mapState(useMainStore, [""]),
    ...mapWritableState(useMainStore, [""]),
  },
  methods: {
    ...mapActions(useMainStore, [""]),
  },
  created() {},
};
</script>

<template>
  <div class="container mx-auto">
    <ThePopularMovies />
  </div>
</template>

<style></style>
