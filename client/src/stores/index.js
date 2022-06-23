import { defineStore } from 'pinia'
import axios from "axios"

export const useIndexStore = defineStore({
  id: "index",
  state: () => ({
    url: "https://marazzo-by-nurma.herokuapp.com",
    products: [],
    carts: [],
    blogs: [],
    totalPrice: 0,
    totalItem: 0,
    tokenMidtrans: "",
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
          url: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0c5be6ecf9e44df09394fc44bea5e816",
        });

        this.blogs = result.data.articles;
        console.log(result.data.articles, "<<<<< get blog");
      } catch (err) {
        console.log(err.message, "<<< error");
      }
    },

    /*--------------------------------------------------------------
    # GET MIDTRANS TOKEN
    --------------------------------------------------------------*/
    async midtransStore(total) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios({
            method: "POST",
            url: `${this.url}/charge`,
            data: { total },
            headers: { access_token: localStorage.getItem("access_token") },
          });

          this.tokenMidtrans = result.data.token;
          console.log(result.data.articles, "<<<<< get blog");
          resolve();
        } catch (err) {
          console.log(err.message, "<<< error");
          reject(err);
        }
      });
    },

    /*--------------------------------------------------------------
    # UPDATE STATUS WHEN CHECKOUT
    --------------------------------------------------------------*/
    async patchStatus() {
      return new Promise(async (resolve, reject) => {
        try {
          resolve();
        } catch (err) {
          console.log(err.message, "<<< error");
          reject(err);
        }
      });
    },
  },
});
