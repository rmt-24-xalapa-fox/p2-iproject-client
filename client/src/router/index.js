import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Home from  '../views/Home.vue'
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
    }
  ]
})

export default router
