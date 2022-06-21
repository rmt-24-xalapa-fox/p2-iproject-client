import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Products from "../views/ProductsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Dashboard,
    },
    {
      path: "/products",
      name: "Products",
      component: Products,
    },
  ],
});

export default router;
