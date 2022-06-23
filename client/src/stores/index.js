import { defineStore } from 'pinia'
import axios from "axios"

export const useIndexStore = defineStore({
  id: "index",
  state: () => ({
    url: "http://localhost:3001",
    products: [],
    carts: [],
    blogs: [],
    totalPrice: 0,
    totalItem: 0,
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
    async isRegis(email, password, phoneNumber) {
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

    /*--------------------------------------------------------------
    # ADD PRODUCT TO CART
    --------------------------------------------------------------*/
    async addCart(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios({
            method: "POST",
            url: `${this.url}/products/${id}`,
            headers: { access_token: localStorage.getItem("access_token") },
          });
          console.log(result, "<<<< add product to cart");
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    /*--------------------------------------------------------------
    # FETCH CART
    --------------------------------------------------------------*/
    async readCart() {
      try {
        const result = await axios({
          method: "GET",
          url: `${this.url}/cart`,
          headers: { access_token: localStorage.getItem("access_token") },
        });

        this.carts = result.data.data.Products;
        this.totalPrice = result.data.totalPrice;
        this.totalItem = result.data.totalItem;
        console.log(result.data, "<<<<< get Cart");
      } catch (err) {
        console.log(err.message, "<<< error");
      }
    },

    /*--------------------------------------------------------------
    # DELETE CART
    --------------------------------------------------------------*/
    async deleteCart(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios({
            method: "DELETE",
            url: `${this.url}/cart/${id}`,
            headers: { access_token: localStorage.getItem("access_token") },
          });
          console.log(result, "<<<< DELETE cart");
          resolve();
        } catch (err) {
          console.log(err, "<<<< error delete");
          reject(err);
        }
      });
    },

    /*--------------------------------------------------------------
    # FETCH BLOG API
    --------------------------------------------------------------*/
    async fetchBlog() {
      try {
        const result = await axios({
          method: "GET",
          url: `${this.url}/blog`,
        });

        this.blogs = result.data.articles;
        console.log(result.data.articles, "<<<<< get blog");
      } catch (err) {
        console.log(err.message, "<<< error");
      }
    },
  },
});
