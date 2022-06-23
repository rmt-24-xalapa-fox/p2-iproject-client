import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import mapViewVue from "../views/mapView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/map",
      name: "map",
      component: mapViewVue,
    },
  ],
});

export default router;
