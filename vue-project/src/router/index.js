import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import mapViewVue from "../views/mapView.vue";
import RegisterViewVue from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterViewVue,
    },
    {
      path: "/map",
      name: "map",
      component: mapViewVue,
    },
  ],
});

router.beforeEach((to, from) => {
  let isLogin = localStorage.getItem("access_token");
  if (isLogin && (to.name == "login" || to.name == "register")) {
    return { name: "home" };
  }
});

export default router;
