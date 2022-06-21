import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue"
import ActorsPage from "../views/ActorsPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/actors",
      name: "ActorsPage",
      component: ActorsPage,
    },
  ],
});

export default router;
