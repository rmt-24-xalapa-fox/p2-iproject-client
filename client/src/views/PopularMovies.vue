<script>
import { useCounterStore } from "../stores/counter";
import { mapActions, mapState } from "pinia";

export default {
  name: "PopularMovies",
  data() {
    return {
      baseImgUrl: "https://image.tmdb.org/t/p",
    };
  },
  computed: {
    ...mapState(useCounterStore, ["moviesData"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["getPopularMovies"]),
  },
  created() {
    this.getPopularMovies();
  },
};
</script>

<template>
  <div
    v-for="(movie, id) in moviesData"
    :key="id"
    class="flex flex-row w-1/2 max-w-sm mx-auto my-8"
  >
    <div
      class="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"
      :style="{
        backgroundImage: `url(${baseImgUrl}/w500${movie.backdrop_path})`,
      }"
    ></div>
  </div>
</template>
