import { defineStore } from "pinia";
import axiosInstance from "../axiosInstance";
import axios from "axios";

export const usePoemStore = defineStore({
  id: "poem",
  state: () => ({
    poems: [],
    poemDetail: [],
    myPoems: [],
    browsePoems: [],
    author: "",
  }),
  getters: {},
  actions: {
    async getPoem() {
      try {
        const { data } = await axiosInstance.get("/");
        console.log(data);
        this.poems = data;
      } catch (err) {
        console.log(err);
      }
    },
    async getPoemDetail() {
      try {
        const id = +localStorage.getItem("selected");
        const { data } = await axiosInstance.get(`/read-more/${id}`);
        console.log(data);
        this.poemDetail = data;
      } catch (err) {
        console.log(err);
      }
    },
    async getMyPoem() {
      try {
        let id = +localStorage.getItem("id");
        const { data } = await axiosInstance(`/my-poem/${id}`);
        console.log(data);
        this.myPoems = data;
      } catch (err) {
        console.log(err);
      }
    },
    browseAuthor(author) {
      this.author = author;
      // console.log(this.author);
      this.getBrowsePoem()
    },
    async getBrowsePoem() {
      try {
        const author = this.author;
        const { data } = await axios.get(
          `https://poetrydb.org/author/${author}`
        );
        // console.log(data, "<<<<<");
        this.browsePoems = data;
      } catch (err) {
        console.log(err, "<<<<");
      }
    },
  },
});
