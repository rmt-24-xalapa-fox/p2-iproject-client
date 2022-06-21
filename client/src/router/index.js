import { createRouter, createWebHistory } from "vue-router";
import LoginPageVue from "../views/LoginPage.vue";
import RegisterPageVue from "../views/RegisterPage.vue";
import NotFoundVue from "../views/NotFound.vue";
import swal from "sweetalert";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegisterPageVue,
      beforeEnter(to, from, next) {
        if (localStorage.getItem("access_token")) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPageVue,
      beforeEnter(to, from, next) {
        if (localStorage.getItem("access_token")) {
          swal({
            text: "You are logged in",
            icon: "success",
          });
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundVue,
    },
  ],
});

export default router;
