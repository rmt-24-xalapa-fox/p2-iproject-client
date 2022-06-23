import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Bookmark from "../views/Bookmark.vue";
import Detail from "../views/Detail.vue";
import Cart from "../views/Cart.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home

    },
    {
      path: '/register',
      name: "Register",
      component: Register
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/detail/:id',
      name: "detail",
      component: Detail
    },
    {
      path: '/cart',
      name: "cart",
      component: Cart
    },
  ]
});

router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("access_token");
  if (isLogin && to.name === "login") {
    next({ name: "home" });
  } else if (!isLogin && to.name === "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
