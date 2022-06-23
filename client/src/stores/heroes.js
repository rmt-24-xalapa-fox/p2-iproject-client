import { defineStore } from "pinia";
import axios from "axios";

export const useHeroStore = defineStore({
  id: "heroes",
  state: () => ({
    counter: 0,
    heroes: [],
    roles: [],
    sortByRole: [],
    detail: [],
    ytApi: [],
    items: [],
    buildList: [],
    baseUrl: "https://be-pro-vue.herokuapp.com",
    isLogin: localStorage.getItem("access_token"),
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },

    async login(data) {
      try {
        let response = await axios({
          method: "POST",
          url: `${this.baseUrl}/login`,
          data: data,
        });
        console.log(response.data);
        let access_token = response.data.access_token;
        let userId = response.data.id;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("id", userId);
        await this.fetchHeroes();
        return true;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
        return false;
      }
    },

    async register(data) {
      try {
        await axios({
          method: "POST",
          url: `${this.baseUrl}/register`,
          data: data,
        });
        Swal.fire("Thank You for Register!", "Please Login!", "success");
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
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
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
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
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
    },

    async fetchByRoles(input) {
      try {
        let { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}/api/roles/${input}`,
        });
        // console.log(data.response.data);
        this.sortByRole = data.response.data;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
    },

    async detailHero(id) {
      try {
        let { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}/api/heroes/${id}`,
        });
        // console.log(data.response.data);
        this.detail = data.response.data;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
    },

    async getChannel() {
      try {
        let { data } = await axios({
          method: "GET",
          url: "https://www.googleapis.com/youtube/v3/channels",
          params: {
            part: "snippet,statistics,contentDetails,status",
            id: "UCoOBH3pnS-K5QugkFfaDIHQ",
            key: "AIzaSyCWk4HSGpFRumVEby2OEqw45kz_rh930M0",
          },
        });
        console.log(data.items);
        this.ytApi = data.items;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
    },

    async getItem() {
      try {
        let response = await axios({
          method: "GET",
          url: `${this.baseUrl}/items`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(response);
        this.items = response.data.itemList;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
    },

    async addBuild() {
      try {
        let response = await axios({
          method: "POST",
          url: `${this.baseUrl}/builds`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(response);
        Swal.fire("Success Add Bookmarks", "Please Check in Bookmarks", "success");
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
    },

    async getBuild() {
      try {
        let response = await axios({
          method: "GET",
          url: `${this.baseUrl}/builds`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(response);
        this.buildList = response.data.buildList;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          text: `${err.response.data.message}`,
        });
      }
    },
  },
});
