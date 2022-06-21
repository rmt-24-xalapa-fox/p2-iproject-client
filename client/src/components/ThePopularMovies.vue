<script>
import ThePopularMoviesCard from "../components/ThePopularMoviesCard.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useMainStore } from "../stores/store";

const baseUrl = "http://localhost:3000";

export default {
  name: "ThePopularMovies",
  components: {
    ThePopularMoviesCard,
  },
  computed: {
    ...mapState(useMainStore, ["movies", "genres"]),
    ...mapWritableState(useMainStore, [""]),
  },
  methods: {
    ...mapActions(useMainStore, ["fetchGenres", "fetchMoviesPopular"]),
  },
  created() {
    this.fetchGenres()
    this.fetchMoviesPopular()
  },
};
</script>

<template>
  <div class="mx-5">
    <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold">
      Popular Movies
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <ThePopularMoviesCard 
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>
  </div>
</template>

<style></style>
