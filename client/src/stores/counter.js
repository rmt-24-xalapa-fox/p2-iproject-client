import { defineStore } from 'pinia';
import axios from "axios";
import { swal } from 'sweetalert2/dist/sweetalert2';

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
        Swal.fire({
          icon: 'success',
          title: 'Success Login',
          showConfirmButton: true,
          timer: 1500
        });
        this.router.push("/");
      } catch (err) {
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
      }
    },

    async getData() {
      try {
        const allProduct = await axios({
          method: "GET",
          url: "http://localhost:3000/customer/product",
        });
        this.dataProduct = allProduct.data.allProduct;
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
      }
    },

    async buyHandler(id, name, qty, cartId) {
      try {
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
        Swal.fire({
          title: '<strong>HTML <u>Pay Here</u></strong>',
          icon: 'success',
          html:
            `You can use <b>bold text</b>, 
            <a href="${forPaid.data.invoice.invoice_url}" target="_blank">links</a>`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'
        });

        this.deleteHandler(cartId);
        this.getAllCart();

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
      }
    },

    async detailHandler(id) {
      try {
        const detailProduct = await axios({
          method: "GET",
          url: `http://localhost:3000/customer/detail/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        });
        this.productDetail = detailProduct.data;

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
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
        this.dataCart = cartData.data;

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
      }
    },

    async deleteHandler(id) {
      try {
        const deleted = await axios({
          method: "DELETE",
          url: `http://localhost:3000/customer/cart/${+id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });
        this.getAllCart();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
      }
    },

    async fetchYoutube() {
      try {
        let query = "obat herbal";
        const obatHerbal = await axios({
          method: "GET",
          url: `http://localhost:3000/api3rdParty/youtube?query=${query}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        });
        this.youtubeUrl = obatHerbal.data;
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        });
      }
    }
  }
});
