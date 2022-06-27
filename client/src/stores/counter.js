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
        console.log(email, "dariiiii store");
        const userLog = await axios({
          method: "POST",
          url: "https://muvistore.herokuapp.com/customer/login",
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
          url: "https://muvistore.herokuapp.com/customer/register",
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
          url: "https://muvistore.herokuapp.com/customer/product",
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
          url: `https://muvistore.herokuapp.com/customer/cart/${id}`,
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

      } catch (err) {
        console.log(err);
      }
    },

    async detailHandler(id) {
      try {
        console.log(id);
        const detailProduct = await axios({
          method: "GET",
          url: `https://muvistore.herokuapp.com/customer/detail/${id}`,
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
          url: `https://muvistore.herokuapp.com/customer/cart/${id}`,
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
          url: 'https://muvistore.herokuapp.com/customer/cart',
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
          url: `https://muvistore.herokuapp.com/customer/cart/${+id}`,
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
          url: `https://muvistore.herokuapp.com/api3rdParty/youtubeList?query=${query}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        });
        this.youtubeUrl = obatHerbal.data;
        console.log(this.youtubeUrl);
      } catch (err) {
        console.log(err);
      }
    }
  }
});
