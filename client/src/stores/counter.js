import { defineStore } from 'pinia'
import axios from 'axios';

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    movies: [],
    favourites: [],
    movieDetail:{},
    loggedinEmail: "Guest",
    //baseUrl: "http://localhost:3000/",
    baseUrl: "https://ipserver-insta-vue.herokuapp.com/",    
    baseLogin: "users/login",
    baseLoginGoogle: "users/loginGoogle",
    baseRegister: "users/register",
    basePost: "post",
    baseFollowing: "users/following",
    baseFollow: "users/follow",
    baseCoinPrie: "users/coinPrice",
    baseBuyCoin: "users/buyCoin",
    baseGiftCoin: "users/giftCoin",
    basePromotePost:"promotePost",
    baseFavourite: "favourite",
    isLogin: false,
    errorHandler: "",
    totalPages:0,
    currentPages:0,
    limit: 3
  }),
  getters: {

  },
  actions: {
    setError(message) {
      this.errorHandler = message;
    },
    doLogout() {
      localStorage.clear();
      this.loggedinEmail="Guest"
      console.log("LOGOUT")
      this.setError("Logged Out")
      this.checkLogin();
    },
    checkLogin() {
      if (localStorage.getItem("access_token")) {
        this.isLogin = true;
        if (localStorage.getItem("user")) {
          this.loggedinEmail = localStorage.getItem("user");
        }
      } else {
        this.isLogin = false;
      }
    },
    populateData(filter) {
      let option = ""
      if (filter) {
        if(filter.title){
          option += "&title=" + filter.title
        }        
      }
      // if (localStorage.getItem("access_token")) {
        console.log("Logged in")
        console.log("Pages: "+this.currentPages);
        let tempThis = this;
        this.movies = [];
        axios.get(this.baseUrl + "" + this.basePost + "?limit=" + this.limit +"&page="+this.currentPages+ option, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
          console.log(response.data);
          this.totalPages=response.data.totalPages;
          response.data.Posts.forEach(element => {
            tempThis.movies.push(element);
          });
          console.log(tempThis.movies);
        }).catch((error) => {

          console.log(error);
          this.setError(error.response.data.message)
        })
      

    },
    populateFavourite() {
      if (localStorage.getItem("access_token")) {
        console.log("Logged in")
        let tempThis = this;
        this.favourites = [];
        axios.get(this.baseUrl + "" + this.baseFavourite, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
          console.log(response.data);
          response.data.Favourites.forEach(element => {
            tempThis.favourites.push(element);
          });
          console.log(tempThis.favourites);
        }).catch((error) => {
          console.log(error);
          this.setError(error.response.data.message)
        })
      }
    }
  }
})
