import { defineStore } from "pinia";
import axios from "axios";

export const useCounter = defineStore({
  id: "counter",
  state() {
    return {
      baseURL: `http://localhost:3000`,
      products: [],
      productId: 0,
      sales: []
    };
  },
  getters: {},
  actions: {
    clickHome() {
      this.router.push({
        name: "Home"
      })
    },
    clickProducts() {
      this.router.push({
        name: "Products"
      })
      this.fetchProducts()
    },
    clickSales() {
      this.router.push({
        name: "Sales"
      })

      this.fetchAllSales()
    },
    async fetchProducts() {
      try {
        const response = await axios.get(`${this.baseURL}/products`, {});

        this.products = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchOneProduct(id) {
      try {
        console.log(id);
        const response = await axios.get(`${this.baseURL}/products/${id}`, {
          params: {
            id: +id
          }
        })

        this.productId = +id
        this.products = response.data[0]
        this.router.push({
          path: `/products/${id}`
        })
      } catch (err) {
        console.log(err);
      }
    },
    async fetchAllSales() {
      try {
        const response = await axios.get(`${this.baseURL}/sales`, {})

        this.sales = response.data
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  },
});
