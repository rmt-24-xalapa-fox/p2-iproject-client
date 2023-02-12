import { defineStore } from "pinia";
import axiosInstance from "../axiosInstance";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLogin: false,
    colorPalette: [],
    colorPalettes: [],
    user: {},
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
        let res = await axiosInstance.post(
          "/palettes/add",
          { name, colors },
          { headers }
        );
        res = res.data;
        const succMsg = res.message;
        swal("Success", succMsg, "success");
        this.router.push("/");
      } catch (err) {
        const errMsg = err.response.data.error.message;
        swal("Error", errMsg, "error");
      }
    },
    async readUser() {
      try {
        const headers = {
          access_token: localStorage.getItem("access_token"),
        };
        const res = await axiosInstance.get("/profile", { headers });
        this.user = res.data.user;
      } catch (err) {
        console.log(err);
      }
    },
    async upgradePlan() {
      try {
        const headers = {
          access_token: localStorage.getItem("access_token"),
        };
        const res = await axiosInstance.post(
          "/profile/tokenUpgrade",
          {},
          { headers }
        );
        window.snap.pay(res.data.token, {
          onSuccess: async function (result) {
            let res = await axiosInstance.patch(
              "/profile/upgradePlan",
              {},
              {
                headers: {
                  access_token: localStorage.getItem("access_token"),
                },
              }
            );
            res = res.data;
            const succMsg = res.message;
            swal("Success", succMsg, "success");
          },
        });
      } catch (err) {
        const errMsg = err.response.data.error.message;
        swal("Error", errMsg, "error");
      }
    },
  },
});
