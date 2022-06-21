import { defineStore } from 'pinia'
import axios from "axios"

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    islogin: false,
    baseUrl: "http://localhost:3000"
  }),
  getters: {

  },
  actions: {
    isLogin(status = false){
      this.islogin = status
    },
    async toLogin(username, password){
      try{
        const response = await axios({
          url: `${this.baseUrl}/login`,
          method: "post",
          data: {
            username,
            password
          }
        })
        Swal.fire({
          title: "Success Login",
          icon: 'success'
        })
        localStorage.setItem("access_token", response.data.access_token)
        this.router.push('/')
      }
      catch(err){
        console.log(err)
      }
    },
    async addNewUser(username, email, password, phoneNumber, address){
      try{
        const response = await axios({
          url: `${this.baseUrl}/register`,
          method: "post",
          data: {
            username,
            email,
            password,
            phoneNumber,
            address
          }
        })
        Swal.fire({
          title: "Success register",
          icon: 'success'
        })
        this.router.push('/login')
      }
      catch(err){
        console.log(err)
      }
    }
  }
})
