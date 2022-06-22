import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import CartPage from '../views/CartPage.vue'
import ShipPayPage from '../views/ShipPayPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: '/login',
      name: "login",
      component: LoginPage
    },
    {
      path: `/cart`,
      name: `cart`,
      component: CartPage
    },
    {
      path: `/shippay`,
      name: `shippay`,
      component: ShipPayPage
    }

  ],
});

export default router;
