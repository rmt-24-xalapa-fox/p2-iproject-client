import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";
import Tutorial from "../views/Tutorial.vue";

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
      path: "/build",
      name: "build",
    },
    {
      path: "/tutorial",
      name: "tutorial",
      component: Tutorial,
    },
  ],
});

export default router;
