import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Products from "../views/ProductsPage.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Sales from "../views/SalesPage.vue";
import Ingredients from "../views/IngredientsPage.vue";

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
    {
      path: "/products/:id",
      name: "ProductDetail",
      component: ProductDetail,
    },
    {
      path: "/sales",
      name: "Sales",
      component: Sales,
    },
    {
      path: "/ingredients",
      name: "Ingredients",
      component: Ingredients,
    },
  ],
});

export default router;
