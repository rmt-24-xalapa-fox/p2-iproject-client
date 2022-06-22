import { defineStore } from 'pinia'
import axios from "axios"

export const useIndexStore = defineStore({
  id: "index",
  state: () => ({
    url: "http://localhost:3001",
    products: [],
  }),
  getters: {},
  actions: {
    /*--------------------------------------------------------------
    # FETCH ALL PRODUCTS
    --------------------------------------------------------------*/

    async fetchProduct() {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios({
            method: "GET",
            url: `${this.url}/products`,
          });

          console.log(result, "<<<< result fetch Product");
          this.products = result.data;
          resolve();
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },
  },
});
