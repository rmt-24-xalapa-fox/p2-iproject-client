import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import HomePage from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("access_token");

  if (to.name == "login" && isLogin) {
    next("/");
  } else if (to.name == "register" && isLogin) {
    next("/");
  } else if ( to.name == "home" && !isLogin) {
    next("/login");
  } 
  else {
    next();
  }
});

export default router;
