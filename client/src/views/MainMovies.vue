<script>
import { useCounterStore } from "../stores/counter";
import { mapActions, mapState } from "pinia";
import PopularMovies from "@/components/PopularMovies.vue";
import TrendingMovies from "@/components/TrendingMovies.vue";
import TopMovies from "@/components/TopMovies.vue";

export default {
  name: "MainHome",
  components: {
    PopularMovies,
    TrendingMovies,
    TopMovies,
  },
  computed: {
    ...mapState(useCounterStore, ["moviesData", "topMovies", "trendingMovies"]),
  },
  methods: {
    ...mapActions(useCounterStore, [
      "getPopularMovies",
      "getTrendingMovies",
      "getTopMovies",
    ]),
  },
  created() {
    this.getPopularMovies();
    this.getTrendingMovies();
    this.getTopMovies();
  },
};
</script>

<template>
  <!-- movie display section -->
  <div class="w-full bg-grey">
    <h3 class="text-white text-2xl pt-6 ml-4 text-left">Most Popular</h3>
    <div class="flex space-x-4 overflow-y-hidden overflow-x-scroll">
      <PopularMovies
        v-for="movies in moviesData"
        :key="movies.id"
        :popularMovie="movies"
      />
    </div>
    <h3 class="text-white text-2xl pt-6 ml-4 text-left">Trending</h3>
    <div class="flex space-x-4 overflow-y-hidden overflow-x-scroll">
      <TrendingMovies
        v-for="movies in trendingMovies"
        :key="movies.id"
        :trendingMovie="movies"
      />
    </div>
    <h3 class="text-white text-2xl pt-6 ml-4 text-left">Top Rated</h3>
    <div class="flex space-x-4 overflow-y-hidden overflow-x-scroll">
      <TopMovies
        v-for="movies in topMovies"
        :key="movies.id"
        :topMovie="movies"
      />
    </div>
  </div>
</template>
