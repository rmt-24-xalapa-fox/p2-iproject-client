import { defineStore } from 'pinia'
import axios from 'axios';

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    posts: [],
    favourites: [],
    postDetail:{},
    coins: [],
    comments:[],
    linkXendit:'',
    loggedinEmail: "Guest",
    baseUrl: "http://localhost:3000/",
    //baseUrl: "https://ipserver-insta-vue.herokuapp.com/",    
    baseLogin: "users/login",
    baseLoginGoogle: "users/loginGoogle",
    baseRegister: "users/register",
    basePost: "post",
    baseFollowing: "users/following",
    baseFollow: "users/follow",
    baseCoinPrice: "users/coinPrice",
    basegetLink: "users/getLink",
    baseBuyCoin: "users/buyCoin",
    baseGiftCoin: "users/giftCoin",
    baseWallet: "users/wallet",
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
        this.posts = [];
        axios.get(this.baseUrl + "" + this.basePost + "?limit=" + this.limit +"&page="+this.currentPages+ option, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
          console.log(response.data);
          this.totalPages=response.data.totalPages;
          response.data.Posts.forEach(element => {
            tempThis.posts.push(element);
          });
          console.log(tempThis.posts);
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
          tempThis.setError(error.response.data.message)
        })
      }
    },
    // populateCoin() {
    //   if (localStorage.getItem("access_token")) {
    //     console.log("Logged in")
    //     let tempThis = this;
    //     this.favourites = [];
    //     axios.get(this.baseUrl + "" + this.baseCoinPrice, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
    //       console.log(response.data);
    //       // response.data.Favourites.forEach(element => {
    //       //   tempThis.favourites.push(element);
    //       // });
    //       // console.log(tempThis.favourites);
    //     }).catch((error) => {
    //       console.log(error);
    //       this.setError(error.response.data.message)
    //     })
    //   }
    // },
    populateCoin() {
      if (localStorage.getItem("access_token")) {
        console.log("Logged in")
        let tempThis = this;
        this.coins = [];
        axios.get(this.baseUrl + "" + this.baseCoinPrice, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
          console.log(response.data);

          response.data.forEach(element => {
             tempThis.coins.push(element);
          });
          console.log(tempThis.coins);
        }).catch((error) => {
          console.log(error);
          this.setError(error.response.data.message)
        })
      }
    },
    getPostDetail(id){
      let tempThis=this
      axios
        .get(this.baseUrl+this.basePost+"/"+id)
        .then(res => {
          console.log(res.data);
          tempThis.postDetail=res.data.Post;
          tempThis.comments=[]
          res.data.Comments.forEach(element => {
            tempThis.comments.push(element);
          });
          console.log(tempThis.postDetail);
        })
        .catch(e => {
          console.log(e.response.data);
          tempThis.setError(e.response.data.message);
        });
    },
    sendComment(data){
      if (localStorage.getItem("access_token")) {
        let idData=data.id;
        let commentData=data.comment;
        console.log("Logged in")
        let tempThis = this;
        this.favourites = [];
        axios.post(this.baseUrl + "post/"+idData+"/comments", {comment:commentData},{ headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
          console.log(response.data);
          tempThis.getPostDetail(idData);
          tempThis.setError("Commented");
        }).catch((error) => {
          console.log(error);
          this.setError(error.response.data.message)
        })
      }
    },
    doBuyCoin(id){
      let tempThis=this;
      console.log(this.baseUrl + this.basegetLink+"/"+id);
      axios.post(this.baseUrl + this.baseBuyCoin+"/"+id,{}, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
        console.log(response.data.message);
        tempThis.setError(response.data.message);
      // axios.post(this.baseUrl + this.basegetLink+"/"+id, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
      //   console.log(response.data);
      //   console.log(response.data.invoice_url);
      //  this.linkXendit=response.data.invoice_url;
      }).catch((error) => {
        console.log(error);
        this.setError(error.response.data.message)
      })
    },
    getWallet(){
      axios.get(this.baseUrl + this.wallet+"/"+id, { headers: { access_token: localStorage.getItem("access_token") } }).then((response) => {
        console.log(response.data);
        
      }).catch((error) => {
        console.log(error);
        this.setError(error.response.data.message)
      })
    }
  }
})
