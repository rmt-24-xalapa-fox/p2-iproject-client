import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";
import Tutorial from "../views/Tutorial.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Add from "../views/AddBuild.vue";
import Build from "../views/BuildItem.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: Detail,
    },
    {
      path: "/tutorial",
      name: "tutorial",
      component: Tutorial,
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
      path: "/add",
      name: "add",
      component: Add,
    },
    {
      path: "/build",
      name: "build",
      component: Build,
    },
  ],
});

export default router;
