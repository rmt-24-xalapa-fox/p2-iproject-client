import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
<<<<<<< HEAD
import LoginView from "../views/LoginView.vue";
=======
import mapViewVue from "../views/mapView.vue";
>>>>>>> mapView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
<<<<<<< HEAD
      path: "/login",
      name: "login",
      component: LoginView,
=======
      path: "/map",
      name: "map",
      component: mapViewVue,
>>>>>>> mapView
    },
  ],
});

router.beforeEach((to, from) => {
  let isLogin = localStorage.getItem("access_token");
  if (isLogin && to.name == "login") {
    return { name: "home" };
  }
});

export default router;
