import { defineStore } from 'pinia'
import serviceInstance from "../apis/MovieAPI"

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    apiKey: "38f2cc376208d37fec1e1dbaa6c3ae29",
    baseUrl: "http://localhost:4000/",
    moviesData: [],
    trendingMovies: []
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },

    getPopularMovies() {
      this.moviesData = serviceInstance.get(`/movie/popular?api_key=${this.apiKey}`)
    },
    getTrendingMovies() {
      return serviceInstance.get(`/trending/movie/week?api_key=${this.apiKey}`);
    },
    getTopMovies() {
      return serviceInstance.get(`/movie/top_rated?api_key=${this.apiKey}`);
    }
  }
})
