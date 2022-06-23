import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PostDetail from '../components/PostDetail.vue'
import FormPost from '../components/FormPost.vue'
import CoinPage from '../components/CoinPage.vue'

import { useCounterStore } from '../stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addpost',
      name: 'addpost',
      component: FormPost
    },
    {
      path: '/coin',
      name: 'coin',
      component: CoinPage
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: HomeView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: PostDetail
    }

  ]
})

router.beforeEach((to, from, next) => {
  const store = useCounterStore()
  store.checkLogin();
  console.log("THIS IS STORE "+ store.isLogin)
  if ((to.name != 'login' && to.name != 'register' && to.name!="home") && !store.isLogin){
    next({ name: 'login' })
  } 
  else if ((to.name == 'login' || to.name == 'register') && store.isLogin==true){
    
    next({ name: 'home' })
  }else{
    next()
  }
})

export default router
