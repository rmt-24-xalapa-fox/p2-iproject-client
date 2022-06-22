import { defineStore } from "pinia";
import axios from "axios";
export const useIndexStore = defineStore({
  id: "counter",
  state: () => ({
    urlBase: "http://localhost:3000",
    isLogin: false,
    weather: [],
    mountains: [],
    mountainsById: [],
  }),
  getters: {},
  actions: {
    registerStore: function (email, name, password, phoneNumber) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = {
            email,
            name,
            password,
            phoneNumber,
          };
          await axios.post(this.urlBase + "/register", data);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    loginStore: function (email, password) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = {
            email,
            password,
          };
          const response = await axios.post(this.urlBase + "/login", data);
          localStorage.setItem("access_token", response.data.access_token);
          this.isLogin = true;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    logoutStore: function () {
      localStorage.clear();
      this.isLogin = false;
    },

    fetchWeather: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(this.urlBase + "/weather");
          this.weather = response.data;
          resolve();
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Fetching Database Weather`,
          });
          reject(err);
        }
      });
    },

    fetchMountains: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(this.urlBase + "/mountains");
          this.mountains = response.data;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    fetchMountainsById: function (MountainId) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            this.urlBase + "/mountains/" + MountainId
          );
          this.mountainsById = response.data;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
  },
});
