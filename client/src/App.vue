<script>
import { RouterView } from "vue-router";
import { mapState, mapWritableState, mapActions } from "pinia";
import { moviesStore } from "./stores/movies";
import TheNavbar from "./components/TheNavbar.vue";
import TheSearchbar from "./components/TheSearchbar.vue";


export default {
  components: {
    RouterView,
    TheNavbar,
    TheSearchbar
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
  <div id="app">
    <div class="flex justify-between border-b border-gray-500">
      <TheNavbar />
      <TheSearchbar />
    </div>

    <RouterView />
  </div>
</template>

<style></style>
