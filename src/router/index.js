import { createRouter, createWebHistory } from 'vue-router'
import register from '../views/register.vue'
import registerCustomer from '../views/registerCustomer.vue'
import registerBarber from '../views/registerBarber.vue'
import login from '../views/login.vue'
import loginCustomer from '../views/loginCustomer.vue'
import loginBarber from '../views/loginBarber.vue'

import homeBarber from '../views/homeBarber.vue'
import transactionsBarber from '../views/transactionBarber.vue'
import accountBarber from '../views/accountBarber.vue'

import homeCustomer from '../views/homeCustomer.vue'
import bookCustomer from '../views/bookCustomer.vue'
import favoritesCustomer from '../views/favoriteCustomer.vue'
import requestsCustomer from '../views/requestsCustomer.vue'
import customerSearch from '../views/customerSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'home',
      component: register
    },
    {
      path: '/customer/register',
      name: 'about',
      component: registerCustomer
    },
    {
      path: '/barber/register',
      component: registerBarber
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/customer/login',
      component: loginCustomer
    },
    {
      path: '/barber/login',
      component: loginBarber
    },
    {
      path: '/barber/home',
      component: homeBarber
    },
    {
      path: '/barber/transactions',
      component: transactionsBarber
    },
    {
      path: '/barber/accounts',
      component: accountBarber
    },
    {
      path: '/customer/home',
      component: homeCustomer
    },
    {
      path: '/customer/book',
      component: bookCustomer
    },
    {
      path: '/customer/favorites',
      component: favoritesCustomer
    },
    {
      path: '/customer/requests',
      component: requestsCustomer
    },
    {
      path: '/customer/search',
      component: customerSearch
    },
  ]
})

export default router
