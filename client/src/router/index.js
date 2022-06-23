import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardCharacters from '../views/card-characters.vue'
import Comics from '../views/comicsBook.vue'
import DetailCharacter from '../views/datailCardCharacter.vue'
import Login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CardCharacters
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/comics',
      name: 'comics',
      component: Comics
    },
    {
      path: '/detail-character/:id',
      name: 'detail',
      component: DetailCharacter
    }
  ]
})

export default router
