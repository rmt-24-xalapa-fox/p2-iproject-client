import { defineStore } from "pinia";
import axios from 'axios'


export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    baseUrl: 'http://localhost:3000',
    gameNews: [],
    rentalans: []
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
        const response = await axios.get(this.baseUrl + '/rentalan')
        console.log(response);
        this.rentalans = response.data.rentalan
      } catch (err) {
        console.log(err);
        Swal.fire(
          'Cant fetch rentalan',
        )
      }
    }

    // async convertCurrency() {
    //   try {
    //     const currency = await axios.get('https://currency-converter5.p.rapidapi.com/currency/convert', {
    //       params: { format: 'json', from: 'AUD', to: 'CAD', amount: '1' },
    //       headers: {
    //         'X-RapidAPI-Key': 'dac08d7ad1msh7e736e04a8067eep1ee851jsn280ef9cbb278',
    //         'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
    //       }
    //     })
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    // async payment() {
    //   try {
    //     const response = await axios.get('https://buy.stripe.com/test_4gw4ih9En5013EQ8ww')
    //   } catch(err) {
    //     console.log(err);
    //   }
    // }

  },
});
