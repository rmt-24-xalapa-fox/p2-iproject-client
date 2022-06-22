import { defineStore } from "pinia";
import axios from "axios";
import router from "../router/index.js";
import swal from "sweetalert";

export const useMusicYuhu = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
    userloged: {},
    url: "http://localhost:3000/",
    userlogin: {},
    allsong: [],
    allradio: []
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    async signupprocess() {
      try {
        const newUser = await axios.post(this.url + "register", {
          email: this.userloged.email,
          password: this.userloged.password,
          name: this.userloged.name,
        });
        router.push("/login");
        swal({
          title: "Success",
          text: `Thank You for Register ${this.userloged.name}, please check your email`,
          icon: "success",
        });
      } catch (error) {
        console.log(error);
        swal({
          title: "ERROR",
          text: error.response.data.message,
          icon: "error",
        });
      }
    },
    async loginprocess(){
      try {
        const { data } = await axios.post(this.url + "login", {
          email: this.userlogin.email,
          password: this.userlogin.password,
        });
        localStorage.setItem("access_token", data.access_token);
        swal({
          title: "Success",
          text: `Welcome to MUSIC YUHU!`,
          icon: "success",
        });
        router.push("/home");
      } catch (error) {
        console.log(error);
        swal({
          title: "ERROR",
          text: error.response.data.message,
          icon: "error",
        });
      }
    },
    logoutprocess(){
      router.push('/')
      localStorage.clear()
    },
    async getallSong(){
      try {
        const { data } = await axios.get(this.url + `getsong`, {
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.allsong = data
      } catch (error) {
        console.log(error)
      }
    },
    async getallradio(){
      try {
        const { data } = await axios.get(this.url + `top10radio`, {
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.allradio = data
      } catch (error) {
        console.log(error)
      }
    }
  },
});
