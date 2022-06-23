import { defineStore } from "pinia";
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state() {
    return {
      // baseUrl: `http://localhost:4000`,
      baseUrl: `https://cardbas.herokuapp.com`,
      province: [],
      city: [],
      isLogin: false,
      userData: {}
    }
  },
  getters: {

  },
  actions: {
    setIsLogin(status = false) {
      this.isLogin = status
    },
    getUser() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${this.baseUrl}/userdata`, {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          })
          this.userData = response.data.data
          // console.log(this.userData);
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    getProvince() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${this.baseUrl}/province`)
          this.province = response.data
          console.log(this.province, `info`);

          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    getCity(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${this.baseUrl}/city/${id}`)
          this.city = response.data
          // console.log(response.data, `pinia city`);
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    registerUser(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`${this.baseUrl}/register`, {
            email: data.email,
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            address: data.address,
            province: data.provinceId,
            city: data.cityId
          })
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    loginUser(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`${this.baseUrl}/login`, {
            email: data.email,
            password: data.password
          })
          // console.log(response.data.access_token);
          this.isLogin = true
          localStorage.setItem("access_token", response.data.access_token)
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    updateUser(data) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log(data);
          const response = await axios.put(`${this.baseUrl}/updateuser`, {
            username: data.username,
            phoneNumber: data.phoneNumber,
            address: data.address,
            province: data.province,
            city: data.city
          }, {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          })
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
  },
});
