import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/homepage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register.vue"),
    },
    {
      path: "/details/:card",
      name: "detail",
      component: () => import("../views/details.vue"),
    },
    {
      path: "/create",
      name: "createpost",
      component: () => import("../views/form-post.vue"),
    },
    {
      path: "/inbox",
      name: "inbox",
      component: () => import("../views/inbox.vue"),
    },
  ],
});

export default router;
