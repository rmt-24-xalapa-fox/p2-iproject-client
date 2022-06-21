import { defineStore } from "pinia";
import axiosInstance from "../axiosInstance";

export const usePoemStore = defineStore({
  id: "poem",
  state: () => ({
    poems: [],
    poemDetail: [],
  }),
  getters: {},
  actions: {
    async getPoem() {
      try {
        const { data } = await axiosInstance.get("/");
        console.log(data);
        this.poems = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getPoemDetail() {
      try {
        const id = +localStorage.getItem("selected");
        const { data } = await axiosInstance.get(`/read-more/${id}`);
        console.log(data);
        this.poemDetail = data.detail;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
