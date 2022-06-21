import { defineStore } from "pinia";
import axiosInstance from "../axiosInstance";

export const usePoemStore = defineStore({
  id: "poem",
  state: () => ({
    poems: [],
  }),
  getters: {},
  actions: {
    async getPoem() {
      try {
        const { data } = await axiosInstance.get("/");
        console.log(data);
        this.poems = data.data;
      } catch (err) {}
    },
  },
});
