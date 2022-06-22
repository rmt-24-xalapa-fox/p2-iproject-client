import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue"
import LoginPage from "../views/LoginPage.vue"
import RegiterPage from "../views/RegisterPage.vue"
import RentalanInfo from "../views/RentalanInfo.vue"
import Success from "../views/Success.vue"
import ErrorPage from "../views/ErrorPage.vue"
import CurrencyChanger from "../components/CurrencyChanger.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: HomePage,
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },
    {
      path: "/rentalan/:id",
      name: "rentalan",
      component: RentalanInfo
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegiterPage,
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    {
      path: '/cancel',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '/feature',
      name: 'feature',
      component: CurrencyChanger
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token")
  if ((to.name !== 'login' && to.name !== 'register') && !isAuthenticated) next({ name: 'login' })
  else next()
})

export default router;
