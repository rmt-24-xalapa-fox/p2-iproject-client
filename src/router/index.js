import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/loginView.vue'
import reportView from '../views/reportView.vue'
import registerView from '../views/registerView.vue'
import reportFormView from '../views/reportFormView.vue'
import detailView from '../views/detailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: loginView
    },
    {
      path: '/reports',
      name: 'reports',
      component: reportView
    },
    {
      path: '/myreports',
      name: 'myreports',
      component: reportView
    },
    {
      path: '/register',
      name: 'register',
      component: registerView
    },
    {
      path: '/createReport',
      name: 'createReport',
      component: reportFormView
    },
    {
      path: '/reports/:id',
      name: 'reportsDetail',
      component: detailView
    },
  ]
})

export default router
