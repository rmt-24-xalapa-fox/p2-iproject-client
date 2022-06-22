import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Wishlist from '../views/Wishlist.vue'
import DetailPage from '../views/DetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist
    },
    {
      path: '/detail/:ProductId',
      name: DetailPage,
      component: DetailPage
    }
  ]
})

export default router
