import axios from 'axios'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    baseUrl: "http://localhost:4000",
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

    async getPopularMovies() {
      try {
        let response = await axios.get(`${this.baseUrl}/movies`)
        console.log(response.data.results, "ini data movies");
        this.moviesData = response.data.results
      } catch (err) {
        console.log(err, "ini err");
      }
    },
  }
})
