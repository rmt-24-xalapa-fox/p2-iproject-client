<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  name: "card",
  data() {
    return {};
  },
  methods: {
    ...mapActions(useMainStore, ["goToPage"]),
  },
  props: ["movie"],
};
</script>

<template>
  <div
    class="cursor-pointer max-w-sm bg-blue-800 text-white rounded overflow-hidden shadow-lg"
  >
    <img
      class="w-full"
      :src="'https://www.themoviedb.org/t/p/w1280' + movie.poster_path"
      alt="No poster available"
    />
    <div class="lg:px-6 lg:py-4 flex w-full">
      <div class="font-bold text-sm content-center">{{ movie.title }}</div>
    </div>
  </div>
</template>
