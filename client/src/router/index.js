import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Browse from "../views/Browse.vue";
import ReadMore from "../views/ReadMore.vue";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
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
      path: "/browse",
      name: "browse",
      component: Browse,
    },
    {
      path: "/readmore",
      name: "readmore",
      component: ReadMore,
    },
  ],
});

export default router;
