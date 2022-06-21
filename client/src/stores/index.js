import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    isLogin: false,
  }),
  getters: {},
  actions: {},
});
