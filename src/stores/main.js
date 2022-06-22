import { defineStore } from "pinia";
import axiosInstance from "../axiosInstance";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLogin: false,
    colorPalette: [],
    colorPalettes: [],
  }),
  actions: {
    checkIsLogin() {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        this.isLogin = true;
      }
    },
    async readPalettes() {
      try {
        const headers = {
          access_token: localStorage.getItem("access_token"),
        };
        const res = await axiosInstance.get("/palettes", { headers });
        this.colorPalettes = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async generateColor(colorScheme) {
      try {
        const headers = {
          access_token: localStorage.getItem("access_token"),
        };
        const res = await axiosInstance.get("/palettes/generate", {
          params: { colorScheme: colorScheme },
          headers,
        });
        this.colorPalette = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async addPalette(name, colors) {
      try {
        const headers = {
          access_token: localStorage.getItem("access_token"),
        };
        const res = await axiosInstance.post(
          "/palettes/add",
          { name, colors },
          { headers }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
