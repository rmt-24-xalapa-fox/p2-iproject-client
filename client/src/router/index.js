import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import MyDigimon from "../views/MyDigimon.vue";
import TopUp from "../views/TopUp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("access_token")) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("access_token")) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("access_token")) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/topup",
      name: "topup",
      component: TopUp,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("access_token")) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/mydigimon",
      name: "mydigimon",
      component: MyDigimon,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("access_token")) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
