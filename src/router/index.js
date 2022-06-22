import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import PaletteGeneratorPage from "../views/PaletteGeneratorPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import EditProfilePage from "../views/EditProfilePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/generate",
      name: "Generate",
      component: PaletteGeneratorPage,
    },
    {
      path: "/profile/edit",
      name: "EditProfile",
      component: EditProfilePage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("access_token");
  if ((to.name === "Login" || to.name === "Register") && isLogin) {
    next("/");
  } else if (to.name !== "Login" && to.name !== "Register" && !isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
