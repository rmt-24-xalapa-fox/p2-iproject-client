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
    baseUrl: "http://localhost:3030",
    wishlists: [],
    cartProducts: []
  }),
  getters: {
    convertPrice: function () {
      if (this.product.price < 1) {
        this.product.price = 3;
      }
      return (this.product.price *= 15000);
    },
  },
  actions: {
    loginAction: async function (email, password) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            url: `${this.baseUrl}/login`,
            method: "POST",
            data: {
              email,
              password,
            },
          });
          const { access_token } = response.data;
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
            url: `${this.baseUrl}/register`,
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
    getAllProducts: async function (query) {
      try {
        const response = await axios({
          method: "GET",
          url: `${this.baseUrl}/`,
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
          method: "GET",
          url: `${this.baseUrl}/product/${ProductId}`,
        });
        this.product = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    addingWishlist: async function (data) {
      try {
        const response = await axios({
          method: "POST",
          url: `${this.baseUrl}/user/wishlist`,
          data: {
            productId: data.id,
            productName: data.name,
            productBrand: data.brand,
            productPrice: data.price,
            productImage: data.image_link,
            productDescription: data.description,
            productCategory: data.category,
            productType: data.product_type,
            productTags: data.tag_list,
            productColors: data.product_colors
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });
      } catch (err) {
        console.log(err)
      }
    },
    getAllWishlists: async function(){
      try{
        const response = await axios({
          method:'GET',
          url: `${this.baseUrl}/user/wishlist`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(response.data)
        this.wishlists = response.data
      }catch(err){
        console.log(err)
      }
    },
    addToCart: async function(data){
      try{
        const response = await axios({
          method: "POST",
          url: `${this.baseUrl}/user/cart`,
          data: {
            productId: data.id,
            productName: data.name,
            productBrand: data.brand,
            productPrice: data.price,
            productImage: data.image_link,
            productDescription: data.description,
            productCategory: data.category,
            productType: data.product_type,
            productTags: data.tag_list,
            productColors: data.product_colors
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });
        console.log(response)
      }catch(err){
        console.log(err)
      }
    },
    getProductsInCart: async function(){
      try{
        const response = await axios({
          method:'GET',
          url: `${this.baseUrl}/user/cart`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.cartProducts = response.data
      }catch(err){
        console.log(err)
      }
    },
    paymentByMidtrans: async function(megaTotalPrice){
      try{
        console.log(megaTotalPrice)
        const response = await axios({
          method: 'POST',
          url: `${this.baseUrl}/user/transaction`,
          data:{
            megaTotalPrice
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        // console.log(response.data)
        const transactionToken = response.data
        window.snap.pay(transactionToken)
      }catch(err){
        console.log(err)
      }
    }
  },
});
