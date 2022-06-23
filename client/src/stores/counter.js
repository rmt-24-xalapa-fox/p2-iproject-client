import { defineStore } from 'pinia';
import axios from "axios";

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    dataProduct: [],
    isLogin: false,
    productDetail: [],
    dataCart: [],
    youtubeUrl: ''
  }),
  getters: {

  },
  actions: {
    formatCurrency(num) {
      return num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    },

    async login(email, password) {
      try {
        console.log(email, "dariiiii store");
        const userLog = await axios({
          method: "POST",
          url: "http://localhost:3000/customer/login",
          data: {
            email: email,
            password: password,
          },
        });
        localStorage.setItem("access_token", userLog.data.access_token);
        this.isLogin = true;
        console.log(userLog);
        Swal.fire({
          icon: 'success',
          title: 'Success Login',
          showConfirmButton: true,
          timer: 1500
        });
        this.router.push("/");
      } catch (err) {
        console.log(err);
        swal.fire({
          icon: "error",
          title: "Oops...",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    },
    async regHandler(name, username, email, password, phoneNumber, address) {
      try {
        console.log(username, email, password, phoneNumber, address);
        const newCust = await axios({
          method: "POST",
          url: "http://localhost:3000/customer/register",
          data: {
            name,
            username,
            email,
            password,
            phoneNumber,
            address
          }
        });
        Swal.fire({
          icon: "success",
          title: `success create account`,
          showConfirmButton: true,
          timer: 1500,
        });
        this.router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },

    async getData() {
      try {
        const allProduct = await axios({
          method: "GET",
          url: "http://localhost:3000/customer/product",
        });
        console.log(allProduct);
        this.dataProduct = allProduct.data.allProduct;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
      }
    },

    async buyHandler(id, name, qty) {
      try {
        console.log(id, name, qty);
        const forPaid = await axios({
          method: "PATCH",
          url: `http://localhost:3000/customer/cart/${id}`,
          data: {
            id,
            name,
            qty
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        });
        console.log(forPaid);


        // this.router.push('/bookmark');

      } catch (err) {
        console.log(err);
      }
    },

    async detailHandler(id) {
      try {
        console.log(id);
        const detailProduct = await axios({
          method: "GET",
          url: `http://localhost:3000/customer/detail/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        });
        this.productDetail = detailProduct.data;
        // console.log(this.productDetail);
        // this.router.push("/detail");

      } catch (err) {
        console.log(err);
      }
    },

    async addToChart(id, name, qty) {
      try {
        const addChart = await axios({
          method: "POST",
          url: `http://localhost:3000/customer/cart/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            name: name,
            ProductId: id,
            qty: qty
          }
        });
        Swal.fire({
          icon: "success",
          title: `Add to cart`,
          showConfirmButton: true,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async getAllCart() {
      try {
        const cartData = await axios({
          method: "GET",
          url: 'http://localhost:3000/customer/cart',
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        });
        console.log(cartData);
        this.dataCart = cartData.data;

      } catch (err) {
        console.log(err);
      }
    },

    async deleteHandler(id) {
      try {
        console.log(id);
        const deleted = await axios({
          method: "DELETE",
          url: `http://localhost:3000/customer/cart/${+id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });
        this.getAllCart();
      } catch (err) {
        console.log(err);
      }
    },

    async fetchYoutube() {
      try {
        let query = "obat herbal";
        const obatHerbal = await axios({
          method: "GET",
          url: `http://localhost:3000/api3rdPartyRoute/youtubeList?query=${query}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        });
        console.log(obatHerbal);
      } catch (err) {
        console.log(err);
      }
    }
  }
});
