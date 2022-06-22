import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    posts: [],
    news: [],
  }),
  getters: {
    //
  },
  actions: {
    getPosts() {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await axios({
            method: "get",
            url: "http://localhost:3000/posts",
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          });
          console.log(res.data);
          this.posts = res.data;
          resolve();
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },
    getNews() {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await axios({
            method: "get",
            url: "https://newsapi.org/v2/top-headlines?country=id&apiKey=b67e3f1a0f9f4cf2a4723775a66277bd",
          });
          console.log(res.data.articles);
          this.news = res.data.articles;
          resolve();
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },
  },
});
