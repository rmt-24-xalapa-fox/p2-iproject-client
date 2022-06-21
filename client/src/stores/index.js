import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    isLogin: false,
  }),
  getters: {},
  actions: {},
});
