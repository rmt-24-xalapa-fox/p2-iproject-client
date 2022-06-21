import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardCharacters from '../views/card-characters.vue'
import Comics from '../views/comicsBook.vue'

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
      path: '/comics',
      name: 'comics',
      component: Comics
    }
  ]
})

export default router
