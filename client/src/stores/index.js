import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    isLogin: false,
    listFresh: [],
    listInTraining: [],
    listRookie: [],
    listMyDigimon: [],
  }),
  getters: {},
  actions: {
    setIsLogin: function (status) {
      this.isLogin = status;
    },
    piniaLogin: async function (email, password) {
      try {
        // console.log(email, password);
        const response = await axios({
          method: "post",
          url: "http://localhost:3000/login",
          data: {
            email,
            password,
          },
        });
        localStorage.setItem("access_token", response.data.access_token);
        // console.log(this.isLogin);
        this.isLogin = true;
        // console.log(this.isLogin);
        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    fetchListDigimon: async function () {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:3000/digimonList",
        });
        // console.log(response.data.dataDigimonFresh);
        // console.log(response.data.dataDigimonRookie);
        this.listFresh = response.data.dataDigimonFresh;
        this.listInTraining = response.data.dataDigimonInTraining;
        this.listRookie = response.data.dataDigimonRookie;
      } catch (err) {
        console.log(err);
      }
    },
    fetchListMyDigimon: async function () {
      try {
        // console.log("masok 2");
        const response = await axios({
          method: "get",
          url: "http://localhost:3000/user/myDigimon",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log("masok3");
        this.listMyDigimon = response.data;
        // console.log(this.listMyDigimon);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
