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
    userCoin: 0,
    userReferralLink: "",
    userQrCode: "",
  }),
  getters: {},
  actions: {
    gachaDigimon: async function () {
      try {
        const response = await axios({
          method: "put",
          url: "https://gachamon.herokuapp.com/user/gachaDigimon",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.fetchGachaCoin();

        Swal.fire({
          title: response.data.name,
          text: response.data.message,
          imageUrl: `${response.data.img}`,
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: "Custom image",
        });
      } catch (err) {
        const { message } = err.response.data;
        // console.log(err.response.data);
        // console.log(message, code);
        Swal.fire({
          icon: "error",
          title: "Ooops..",
          text: message,
          footer: "",
        });
        console.log(err);
      }
    },
    setIsLogin: function (status) {
      this.isLogin = status;
    },
    piniaRegister: async function (username, email, password, referral) {
      try {
        const response = await axios({
          method: "post",
          url: "https://gachamon.herokuapp.com/register",
          data: {
            username,
            email,
            password,
          },
          params: {
            referral: referral,
          },
        });
        this.router.push("/login");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
        console.log(err);
      }
    },
    piniaLogin: async function (email, password) {
      try {
        // console.log(email, password);
        const response = await axios({
          method: "post",
          url: "https://gachamon.herokuapp.com/login",
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
        console.log(err);
      }
    },
    fetchReferralData: async function () {
      try {
        const response = await axios({
          method: "get",
          url: "https://gachamon.herokuapp.com/user/referralCode",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.userReferralLink = response.data.referralLink;
        this.userQrCode = response.data.qrCode;
      } catch (err) {
        console.log(err);
      }
    },
    fetchGachaCoin: async function () {
      try {
        const response = await axios({
          method: "get",
          url: "https://gachamon.herokuapp.com/user/gachaCoin",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.userCoin = response.data.gachaCoin;
      } catch (err) {
        console.log(err);
      }
    },
    fetchListDigimon: async function () {
      try {
        const response = await axios({
          method: "get",
          url: "https://gachamon.herokuapp.com/digimonList",
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
          url: "https://gachamon.herokuapp.com/user/myDigimon",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log("masok3");
        this.listMyDigimon = response.data;
        // console.log(this.listMyDigimon);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    piniaSellDigimon: async function (myDigimonId) {
      try {
        const response = await axios({
          method: "put",
          url: `https://gachamon.herokuapp.com/user/sellDigimon/${myDigimonId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        //
        Swal.fire({
          icon: "success",
          title: "Digimon has been sold ! You got 50 Coins !",
          showConfirmButton: false,
          timer: 1000,
        });
        this.fetchListMyDigimon();
        this.fetchGachaCoin();
      } catch (err) {
        console.log(err);
      }
    },
  },
});
