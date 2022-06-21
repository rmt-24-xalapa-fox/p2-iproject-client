<script>
import { RouterView } from "vue-router";
import { mapState, mapWritableState, mapActions } from "pinia";
import { moviesStore } from "./stores/movies";

export default {
  components: {
    RouterView,
  },
  computed: {
    ...mapState(moviesStore, [""]),
    ...mapWritableState(moviesStore, [""]),
  },
  methods: {
    ...mapActions(moviesStore, [""]),
  },
  created() {},
};
</script>

<template>
  <div class="flex justify-between border-b border-gray-500">
    <RouterView />
  </div>
</template>

<style></style>
