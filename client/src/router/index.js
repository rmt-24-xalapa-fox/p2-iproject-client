import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../views/HomePage.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Movies from "../views/MainMovies.vue"
import Detail from "../views/MovieDetail.vue"
import Transaction from "../views/Transaction.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: "/transaction",
      name: "Transaction",
      component: Transaction,
    },
    {
      path: "/movies/:id",
      name: "Detail",
      component: Detail,
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == "Transaction" && !localStorage.getItem("access_token"))
    next({ name: "Login" });
  else next();
});
export default router
