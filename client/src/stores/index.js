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
          this.products = result.data.product;
          resolve();
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },

    /*--------------------------------------------------------------
    # LOGIN
    --------------------------------------------------------------*/
    async isLogin(email, password) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios({
            method: "POST",
            url: `${this.url}/login`,
            data: {
              email,
              password,
            },
          });

          console.log(result);
          localStorage.setItem("access_token", result.data.data.access_token);
          localStorage.setItem("UserId", result.data.data.id);
          this.userLogin = true;
          this.router.push("/");
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    setIsLogin: function (status = false) {
      this.userLogin = status;
    },

    /*--------------------------------------------------------------
    # REGISTER
    --------------------------------------------------------------*/
    async isRegis( email, password, phoneNumber) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios({
            method: "POST",
            url: `${this.url}/register`,
            data: {
              email,
              password,
              phoneNumber,
            },
          });
          this.router.push("/login");
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
  },
});
