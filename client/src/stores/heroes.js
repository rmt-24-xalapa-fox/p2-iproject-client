import { defineStore } from "pinia";
import axios from "axios";

export const useHeroStore = defineStore({
  id: "heroes",
  state: () => ({
    counter: 0,
    heroes: [],
    roles: [],
    sortByRole: [],
    baseUrl: "http://localhost:3300",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },

    async fetchHeroes() {
      try {
        let { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}/api/heroes`,
        });
        // console.log(data.response.data);
        this.heroes = data.response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getRoles() {
      try {
        let { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}/api/roles`,
        });
        // console.log(data.response);
        this.roles = data.response;
      } catch (err) {
        console.log(err);
      }
    },

    async fetchByRoles(input) {
      try {
        let { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}/api/roles/${input}`,
        });
        console.log(data.response.data);
        this.sortByRole = data.response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
