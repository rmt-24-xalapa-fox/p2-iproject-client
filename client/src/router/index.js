import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue"
import LoginPage from "../views/LoginPage.vue"
import RegiterPage from "../views/RegisterPage.vue"
import RentalanInfo from "../views/RentalanInfo.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
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

export default router;
