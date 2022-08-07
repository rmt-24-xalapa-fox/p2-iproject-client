<script>
import { mapActions, mapState, mapWritableState } from "pinia";
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
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ movie.title }}</div>
      <p class="text-white text-base">
        {{ movie.description }}
      </p>
    </div>
  </div>
</template>
