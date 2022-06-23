import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'

export const useMainStore = defineStore('main',{
  state: () => ({
    barberList: '',
    favoriteList: '',
    transactions: '',
    barberForBook: '',
    barberSchedule: '',
    datas: ''
  }),
  actions: {
    findBarbers(search) {
      let query = ''
      if(search) {
        query = `?search=${search}`
      }
      axios.get('https://comfortablecutapp.herokuapp.com/customer/barbers'+query, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(resp => {
        this.barberList = resp.data
      })
      .catch(resp => {
        console.log(resp)
        this.router.push('/login')
      })
    },
    findFavorites(){
      axios.get('https://comfortablecutapp.herokuapp.com/customer/favorite', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(resp => {
        this.favoriteList = resp.data
      })
      .catch(resp => {
        console.log(resp)
        this.router.push('/login')
      })
    },
    getTransactions() {
      axios.get('https://comfortablecutapp.herokuapp.com/customer/transactions', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(resp => {
        this.transactions = resp.data
      })
      .catch(resp => {
        console.log(resp)
        this.router.push('/login')
      })
    },
    goToBook(id){
      axios.get('https://comfortablecutapp.herokuapp.com/customer/barbers', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(resp => {
        this.barberForBook = resp.data.find(el => el.id === id)
        this.router.push('/customer/book')
      })
      .catch(resp => {
        console.log(resp)
        this.router.push('/login')
      })
    },
    getBarberSchedule() {
      axios.get('https://comfortablecutapp.herokuapp.com/barber/transactions', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(resp => {
        this.barberSchedule = resp.data
      })
      .catch(resp => {
        console.log(resp)
        this.router.push('/login')
      })
    },
    searchWiki(terms) {
      axios.get(`https://pixabay.com/api/?key=28217654-e5616e0324fb444d75402750e&q=${terms}&image_type=photo`)
      .then(response => {
          console.log(terms, '<<<<<')
          console.log(response.data.hits)
          this.datas = response.data.hits
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
})
