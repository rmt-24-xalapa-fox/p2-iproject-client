import { defineStore } from "pinia";
import axios from 'axios'


export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    isLogin: localStorage.getItem("access_token"),
    baseUrl: "https://ps-anywhere-fix.herokuapp.com",
    // baseUrl: 'http://localhost:3000',
    gameNews: [],
    rentalans: [],
    perRentalan: ""
    // counter: 0,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {

    async registerHandler(email, password) {
      try {
        const response = await axios.post(this.baseUrl + '/player/register', { email, password })
        console.log(response);
        Swal.fire(
          'Register success!'
        )
        this.router.push('/login')
      } catch (err) {
        console.log(err);
      }
    },

    async loginHandler(email, password) {
      try {
        const response = await axios.post(this.baseUrl + '/player/login', { email, password })
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem("email", response.data.email)
        Swal.fire(
          'You have logged in!',
        )
        this.router.push('/home')
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email/password!',
          footer: 'Do you have Register?'
        })
        console.log(err);
      }
    },

    async fetchGame() {
      try {
        const response = await axios.get('https://gaming-news.p.rapidapi.com/news', {
          headers: {
            'X-RapidAPI-Key': 'dac08d7ad1msh7e736e04a8067eep1ee851jsn280ef9cbb278',
            'X-RapidAPI-Host': 'gaming-news.p.rapidapi.com'
          }
        })
        console.log(response);
        this.gameNews = response.data.slice(0, 5)
      } catch (err) {
        console.log(err);
      }
    },

    async fetchRentalan() {
      try {
        const response = await axios.get(this.baseUrl + '/rentalan', {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(response);
        this.rentalans = response.data.rentalan
      } catch (err) {
        console.log(err);
        Swal.fire(
          'Cant fetch rentalan',
        )
      }
    },

    async fetchRentalanById(id, query) {
      try {
        console.log(id, query);
        const response = await axios.get(this.baseUrl + `/rentalan/${id}?${query}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(response);
        this.perRentalan = response.data.perRentalan
      } catch (err) {
        console.log(err);
      }
    },

    logoutHandler() {
      localStorage.clear()
      this.router.push('/')
    },

    async hitStripe() {
      try {
        const response = await axios.post(this.baseUrl + '/create-checkout-session', {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(response.data);
        window.location.href = response.data.url
      } catch (err) {
        console.log(err);
      }
    },

    async bookedUnit(id) {
      try {
        const response = await axios.patch(this.baseUrl + `/rentalan/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(response);
      } catch {
        console.log(err);
      }
    }

  },
});
