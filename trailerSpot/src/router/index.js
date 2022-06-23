import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/homepage.vue"),
      beforeEnter(to, from, next) {
        if (!localStorage.getItem("access_token")) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },

    {
      path: "/login",
      name: "login",
      beforeEnter(to, from, next) {
        if (localStorage.getItem("access_token")) {
          next({ name: "home" });
        } else {
          next();
        }
      },
      component: () => import("../components/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      beforeEnter(to, from, next) {
        if (localStorage.getItem("access_token")) {
          next({ name: "home" });
        } else {
          next();
        }
      },
      component: () => import("../components/register.vue"),
    },
  ],
});

export default router;
