import { defineStore } from "pinia";
import swal from "sweetalert";
import axios from "axios";
import { nextTick } from "vue";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    baseUrl: "http://localhost:3000",
    isLogin: false,
    books: [],
    booksObj: {},
    wishlists: [],
    carts: [],
    orders: [],
    categories: [],
    cities: [],
    accessToken: "",
    book: null,
    shippingOption: [],
    isAlreadyChooseCourier: false,
    indexShippingOption: 0,
  }),
  getters: {},
  actions: {
    async fetchBooks(obj) {
      try {
        const { page, name, categoryId, minPrice, maxPrice } = obj;
        const response = await axios.get(`${this.baseUrl}/books`, {
          params: {
            page,
            name,
            categoryId,
            minPrice,
            maxPrice,
          },
        });
        this.books = response.data.data.books;
        this.booksObj = response.data.data;
      } catch (err) {
        this.showError(err);
      }
    },
    async fetchOneBook(id) {
      try {
        const response = await axios.get(`${this.baseUrl}/books/${id}`);
        this.book = response.data.data;
        this.router.push({
          name: "Book Details",
          params: {
            bookId: id,
          },
        });
      } catch (err) {
        this.router.push({
          name: "NotFound",
        });
      }
    },
    async fetchWishlists() {
      try {
        const response = await axios.get(`${this.baseUrl}/wishlists`, {
          headers: {
            access_token: this.accessToken,
          },
        });
        this.wishlists = response.data.data;
      } catch (err) {
        this.showError(err);
      }
    },
    async addWishlists(bookId) {
      try {
        await axios.post(`${this.baseUrl}/wishlists/${bookId}`, null, {
          headers: {
            access_token: this.accessToken,
          },
        });
        swal({
          title: "Success add book to your wishlists",
          icon: "success",
        });
        this.fetchWishlists();
      } catch (err) {
        this.showError(err);
      }
    },
    async removeWishlists(bookId) {
      try {
        await axios.delete(`${this.baseUrl}/wishlists/${bookId}`, {
          headers: {
            access_token: this.accessToken,
          },
        });
        swal({
          title: "Success remove book from your wishlists",
          icon: "success",
        });
        this.fetchWishlists();
      } catch (err) {
        this.showError(err);
      }
    },
    async fetchCarts() {
      try {
        const response = await axios.get(`${this.baseUrl}/carts`, {
          headers: {
            access_token: this.accessToken,
          },
        });
        this.carts = response.data.data;
      } catch (err) {
        this.showError(err);
      }
    },
    async addCarts(bookId) {
      try {
        await axios.post(`${this.baseUrl}/carts/${bookId}`, null, {
          headers: {
            access_token: this.accessToken,
          },
        });
        swal({
          title: "Success add book to your carts",
          icon: "success",
        });
        this.fetchCarts();
      } catch (err) {
        this.showError(err);
      }
    },
    async removeCarts(bookId) {
      try {
        await axios.delete(`${this.baseUrl}/carts/${bookId}`, {
          headers: {
            access_token: this.accessToken,
          },
        });
        swal({
          title: "Success remove book from your carts",
          icon: "success",
        });
        this.fetchCarts();
      } catch (err) {
        this.showError(err);
      }
    },
    async loginHandler(userObj) {
      try {
        const user = await axios.post(`${this.baseUrl}/login`, userObj);
        this.afterLogin(user);
      } catch (err) {
        this.showError(err);
      }
    },
    async registerHandler(userObj) {
      try {
        await axios.post(`${this.baseUrl}/register`, userObj);
        this.moveToRoute("Login");
        swal({
          title: `Registration success, you can login now`,
          icon: "success",
        });
      } catch (err) {
        this.showError(err);
      }
    },
    logoutHandler() {
      this.isLogin = false;
      localStorage.clear();
      this.moveToRoute("Home");
      swal({
        title: `Logout success!`,
        icon: "success",
      });
    },
    showError(err) {
      // console.log(err);
      if (err.response) {
        const msg = err.response.data.error.message;
        if (Array.isArray(msg)) {
          swal(msg.join("\n"));
        } else {
          swal(msg);
        }
      }
    },
    moveToRoute(routeName) {
      this.router.push({
        name: routeName,
      });
    },
    async handleCredentialResponse(response) {
      try {
        const { credential } = response;
        const user = await axios.post(`${this.baseUrl}/google-sign`, {
          credential,
        });
        this.afterLogin(user);
      } catch (err) {
        this.showError(err);
      }
    },
    googleSignIn() {
      const cb = this.handleCredentialResponse;
      google.accounts.id.initialize({
        client_id:
          "947779996052-tjgqvkf3cd9u0odhknu62l1onldi5b1l.apps.googleusercontent.com",
        callback: cb,
      });
      google.accounts.id.renderButton(
        document.getElementById("google-sign-in"),
        { theme: "outline", size: "large" }
      );
    },
    afterLogin(user) {
      const { accessToken, email, id, username } = user.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("UserId", id);
      localStorage.setItem("UserEmail", email);
      localStorage.setItem("Username", username);
      this.isLogin = true;
      this.accessToken = accessToken;
      this.moveToRoute("Home");
      swal({
        title: `Welcome, ${username}!`,
        icon: "success",
      });
    },
    async fetchCategories() {
      try {
        const response = await axios.get(`${this.baseUrl}/categories`);
        this.categories = response.data.data;
      } catch (err) {
        this.showError(err);
      }
    },
    async fetchCities() {
      try {
        const response = await axios.get(`${this.baseUrl}/shipping/cities`, {
          headers: {
            access_token: this.accessToken,
          },
        });
        this.cities = response.data.data;
      } catch (err) {
        this.showError(err);
      }
    },
    async submitRajaOngkir(obj) {
      try {
        const response = await axios.post(
          `${this.baseUrl}/shipping/costs`,
          obj,
          {
            headers: {
              access_token: this.accessToken,
            },
          }
        );
        this.shippingOption = response.data.data.shipping;
        this.isAlreadyChooseCourier = true;
      } catch (err) {
        this.showError(err);
      }
    },
    async callMidtrans(price, obj) {
      try {
        // console.log(obj);
        const response = await axios.post(
          `${this.baseUrl}/pay`,
          { price },
          {
            headers: {
              access_token: this.accessToken,
            },
          }
        );
        var self = this;
        window.snap.pay(response.data.token, {
          onSuccess(result) {
            self.addOrders(obj);
            self.router.push({
              name: "Order History",
            });
            swal({
              title: "Order Success!",
              icon: "success",
            });
          },
          onPending(result) {
            self.addOrders(obj);
            self.router.push({
              name: "Order History",
            });
            swal({
              title: "Order Success!",
              icon: "success",
            });
          },
          onError(result) {
            swal({
              title: "Error!",
              icon: "success",
            });
          },
          onClose(result) {
            // console.log(result);
          },
        });
      } catch (err) {
        this.showError(err);
      }
    },
    async readOrders() {
      try {
        const response = await axios.get(`${this.baseUrl}/orders`, {
          headers: {
            access_token: this.accessToken,
          },
        });
        this.orders = response.data;
      } catch (err) {
        this.showError(err);
      }
    },
    async addOrders(obj) {
      try {
        await axios.post(`${this.baseUrl}/orders`, obj, {
          headers: {
            access_token: this.accessToken,
          },
        });
        this.clearCarts();
        this.isAlreadyChooseCourier = false;
      } catch (err) {
        this.showError(err);
      }
    },
    async clearCarts() {
      try {
        await axios.delete(`${this.baseUrl}/clearCarts`, {
          headers: {
            access_token: this.accessToken,
          },
        });
      } catch (err) {
        nextTick(err);
      }
    },
  },
});
