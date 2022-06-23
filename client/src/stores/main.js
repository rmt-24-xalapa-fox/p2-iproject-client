import { defineStore } from 'pinia'
import axios from "axios"

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    islogin: false,
    baseUrl: "https://animewatchlist666.herokuapp.com",
    seasonAnime: [],
    currentPage: 1,
    sizePage: 16,
    animes: [],
    totalPage: 0
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
          title: "Success register, check your email for notification",
          icon: 'success'
        })
        this.router.push('/login')
      }
      catch(err){
        console.log(err)
      }
    },

    async getSeasonAnime(){
      try{
        const response = await axios({
          url: `${this.baseUrl}/seasonAnime`,
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })

        this.seasonAnime = response.data
      }
      catch(err){
        console.log(response)
      }
    },
    async getAnime(query){
        try{
          const response = await axios({
            url: `${this.baseUrl}/getAnime`,
            method: "get",
            params: {
              page: this.currentPage,
              name: query,
              size: this.sizePage
            },
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          })
          this.totalPage = response.data.totalPage
        this.animes = response.data.Anime.rows
        }
        catch(err){
          console.log(err)
        }
    },
    // async addFavoriteAnime(){
    //   try{
        
    //   }
    //   catch(err){

    //   }
    // }
  }
})
