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
    licenses: [],
    tokenMidtrans: "",
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

    postLicenseStore: function (
      MountainId,
      QuotaId,
      numberOfClimbers,
      totalPrice
    ) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = {
            numberOfClimbers,
            totalPrice,
          };
          await axios.post(
            this.urlBase + `/licenses/${MountainId}/${QuotaId}`,
            data,
            {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          );
          await axios.patch(
            this.urlBase + "/quota/" + QuotaId,
            {
              quotaUse: numberOfClimbers,
            },
            {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    fetchLicensesStore: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(this.urlBase + "/licenses", {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          });
          this.licenses = response.data;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    hitMidTransStore: function (LicenseId) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            this.urlBase + "/midtrans/" + LicenseId,
            undefined,
            {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          );
          this.tokenMidtrans = response.data.token;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    patchLicenseStore: function (LicenseId) {
      return new Promise(async (resolve, reject) => {
        try {
          await axios.patch(
            this.urlBase + "/licenses/pay/" + LicenseId,
            undefined,
            {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    handleCredentialResponse(response) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = {
            credential: response.credential,
          };
          const responded = await axios.post(this.urlBase + "/gsignin", data);

          const respon = responded.data.data;

          localStorage.setItem("access_token", respon.access_token);
          localStorage.setItem("email", respon.email);
          localStorage.setItem("role", respon.role);
          localStorage.setItem("userId", respon.userId);

          this.isLogin = true;
          this.router.push("/");
          resolve();
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: "Error Google Sign In",
            title: "Oops...",
            text: `Error`,
          });
        }
      });
    },

    deleteLicensesStore: function (QuotaId) {
      return new Promise(async (resolve, reject) => {
        try {
          await axios.delete(this.urlBase + "/licenses/" + QuotaId, {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
  },
});
