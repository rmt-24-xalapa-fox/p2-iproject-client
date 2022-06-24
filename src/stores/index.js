import { defineStore } from "pinia";
import axios from "axios"

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    // counter: 0,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
    
  },
});
