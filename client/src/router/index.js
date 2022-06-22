import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DetailProduct from "../views/DetailProduct.vue";
import Cart from "../views/Cart.vue";
import Dashboard from "../views/Dashboard.vue";
import HandleFav from "../views/HandleFav.vue";
import NotFound from "../views/NotFound.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
        {
          path: "/detail/:id",
          name: "detail-product",
          component: DetailProduct,
        },
        {
          path: "/harusLogin",
          name: "handle-cart",
          component: HandleFav,
        },
        {
          path: "/cart",
          name: "cart",
          component: Cart,
          beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("access_token")) {
              next({ name: "handle-cart" });
            } else {
              next();
            }
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("access_token")) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("access_token")) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router
