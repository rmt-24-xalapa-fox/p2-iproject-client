import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue"
import ActorsPage from "../views/ActorsPage.vue"
import MovieDetailPage from "../views/MovieDetailPage.vue"
import ActorDetailPage from "../views/ActorDetailPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    ,
    {
      path: "/movie/:id",
      name: "MovieDetailPage",
      component: MovieDetailPage,
    },
    {
      path: "/actors",
      name: "ActorsPage",
      component: ActorsPage,
    },
    {
      path: "/actor/:id",
      name: "actor",
      component: ActorDetailPage,
    },
  ],
});

export default router;
