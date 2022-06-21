import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = "http://localhost:3000";

export const actorsStore = defineStore("actors", {
  state: () => {
    return {
      actors: [],
      currentPage: 1
    };
  },
  actions: {
    async fetchActors(page) {
      try {
        const response = await axios.get(`${baseUrl}/actor/popular`, {
          page: page
        })
        this.actors = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },

    next() {
      this.currentPage += 1;
      this.fetchActors(this.currentPage);
    },
    previous() {
      this.currentPage -= 1;
      this.fetchActors(this.currentPage);
    },

  },
});
