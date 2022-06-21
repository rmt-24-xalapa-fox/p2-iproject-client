import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = "http://localhost:3000";

export const useMainStore = defineStore("main", {
  id: "counter",
  state: () => {
    return {
      movies: [],
      genres: [],
    };
  },
  actions: {
    async fetchGenres() {
      try {
        const response = await axios.get(`${baseUrl}/genre/list`);
        // console.log(response.data.genres);
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchMoviesPopular() {
      try {
        const response = await axios.get(`${baseUrl}/movie/popular`);
        // console.log(response.data.results);
        this.movies = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
