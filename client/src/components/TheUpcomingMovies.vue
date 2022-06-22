<script>
import axios from "axios";
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  name: "TheUpcomingMovies",
  data() {
    return {
      upcomingMovies: [],
    };
  },
  components: {
    Carousel3d,
    Slide,
  },
  mounted() {
    this.fetchUpcomingMovies();
  },
  methods: {
    async fetchUpcomingMovies() {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=93a882d2427e407e913daed9d97fc683&language=en-US&page=1"
      );

      this.upcomingMovies = response.data.results.slice(1, 6);
      console.log(this.upcomingMovies);
    },
  },
};
</script>

<template>
  <Carousel3d>
    <slide :index="0"> Slide 1 Content </slide>
    <slide :index="1"> Slide 2 Content </slide>
  </Carousel3d>
</template>

<style></style>
