import { createRouter, createWebHistory } from "vue-router";
import LoginPageVue from "../views/LoginPage.vue";
import RegisterPageVue from "../views/RegisterPage.vue";
import NotFoundVue from "../views/NotFound.vue";
import swal from "sweetalert";
import HomePageVue from "../views/HomePage.vue";
import ProfileVue from "../views/Profile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePageVue,
      beforeEnter(to, from, next) {
        if (!localStorage.getItem("access_token")) {
          next("/login");
        } else {
          next();
        }
      },
    },
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
      path: "/profile/:id",
      name: "profile",
      component: ProfileVue,
      beforeEnter(to, from, next) {
        if (!localStorage.getItem("access_token")) {
          next("/login");
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
