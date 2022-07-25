import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Home from  '../views/Home.vue'
import SeasonAnime from '../views/SeasonAnimePage.vue'
import Watchlist from '../views/WatchlistPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        
        if(localStorage.getItem("access_token")){
          next({name: "home"})
        }
        else{
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      beforeEnter: (to, from, next) => {
        
        if(localStorage.getItem("access_token")){
          next({name: "home"})
        }
        else{
          next()
        }
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        
        if(!localStorage.getItem("access_token")){
          next({name: "login"})
        }
        else{
          next()
        }
      }
    },
    {
      path: '/seasonAnime',
      name: 'season',
      component: SeasonAnime,
      beforeEnter: (to, from, next) => {
        
        if(!localStorage.getItem("access_token")){
          next({name: "login"})
        }
        else{
          next()
        }
      }
    },
    {
      path: '/Watchlist',
      name: 'watchlist',
      component: Watchlist,
      beforeEnter: (to, from, next) => {
        
        if(!localStorage.getItem("access_token")){
          next({name: "login"})
        }
        else{
          next()
        }
      }
    }
  ]
})

export default router
