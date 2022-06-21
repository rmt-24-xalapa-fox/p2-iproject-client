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
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/topup",
      name: "topup",
      component: TopUp,
    },
    {
      path: "/mydigimon",
      name: "mydigimon",
      component: MyDigimon,
    },
  ],
});

export default router;
