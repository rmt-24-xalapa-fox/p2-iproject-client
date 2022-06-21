import { defineStore } from "pinia";
import axios from 'axios'

export const useCounter = defineStore({
  id: "counter",
  state() {
    return {
      baseURL: `http://localhost:3000`,
      products: []
    };
  },
  getters: {},
  actions: {
    async fetchProducts(){
      try {
        const response = await axios.get(`${this.baseURL}/products`, {})

        console.log(response.data);
        this.products = response.data
      } catch (err) {
        console.log(err);
      }
    }
  },
});
