import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    hasLoggedIn: false,
    products: [],
    currentPage: 0,
    totalPages: 0,
    product: {},
  }),
  getters: {
    convertPrice: function () {
      if (this.product.price == 0.0) {
        this.product.price = 3;
      }
      return (this.product.price = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(this.product.price * 15000));
    },
  },
  actions: {
    loginAction: async function (email, password) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            url: "http://localhost:3030/login",
            method: "POST",
            data: {
              email,
              password,
            },
          });
          const { access_token } = response.data.data;
          localStorage.setItem("access_token", access_token);
          this.hasLoggedIn = true;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    register: function (email, password, username) {
      return new Promise(async (resolve, reject) => {
        try {
          await axios({
            url: "http://localhost:3030/register",
            method: "POST",
            data: {
              email,
              password,
              username,
            },
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    setHasLoggedIn: function (status = false) {
      this.hasLoggedIn = status;
    },
    loginWithGoogle: async function (credential) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            method: "POST",
            url: "http://localhost:3030/google-sign", // Please fill with your backend url!
            headers: {
              credential,
            },
          });
          console.log(response)
          const { access_token } = response.data;
          localStorage.setItem("access_token", access_token);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    getAllProducts: async function (query) {
      try {
        console.log(query);
        const response = await axios({
          method: "GET",
          url: "http://localhost:3030/",
          params: query,
        });
        this.products = response.data.data;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
      } catch (err) {
        console.log(err);
      }
    },
    getOneProduct: async function (ProductId) {
      try {
        const response = await axios({
          method: 'GET',
          url: `http://localhost:3030/product/${ProductId}`
        })
        this.product = response.data
      } catch (err) {
        console.log(err)
      }
    },
  },
});
