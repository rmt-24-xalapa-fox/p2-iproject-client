import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    checkIsLogin() {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        this.isLogin = true;
      }
    },
  },
});
