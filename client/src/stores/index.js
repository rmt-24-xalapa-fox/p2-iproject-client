import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    isLogin: false,
  }),
  getters: {},
  actions: {
    setIsLogin: function (status) {
      this.isLogin = status;
    },
    piniaLogin: async function (email, password) {
      try {
        console.log(email, password);
        const response = await axios({
          method: "post",
          url: "http://localhost:3000/login",
          data: {
            email,
            password,
          },
        });
        localStorage.setItem("access_token", response.data.access_token);
        console.log(this.isLogin);
        this.isLogin = true;
        console.log(this.isLogin);
        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
});
