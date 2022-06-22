import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import SignupPage from '../views/SignupPage.vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import RadioPage from '../views/RadioPage.vue'
import SongPage from '../views/SongPage.vue'
import PremiumPage from '../views/PremiumPage.vue'




const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: SignupPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/home/radio',
      name: 'RadioPage',
      component: RadioPage
    },
    {
      path: '/home/song',
      name: 'SongPage',
      component: SongPage
    },
    {
      path: '/home/premium',
      name: 'PremiumPage',
      component: PremiumPage
    }
  ]
})

function authen() {
  if (!localStorage.getItem("access_token")) {
    return false;
  } else {
    return true;
  }
}

router.beforeEach((to)=>{
  if( to.name === "HomePage" && !authen() ) {
      return {name: "LandingPage"}
  } 
})

export default router
