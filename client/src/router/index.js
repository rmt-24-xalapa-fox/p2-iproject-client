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
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/seasonAnime',
      name: 'season',
      component: SeasonAnime
    },
    {
      path: '/Watchlist',
      name: 'watchlist',
      component: Watchlist
    }
  ]
})

export default router
