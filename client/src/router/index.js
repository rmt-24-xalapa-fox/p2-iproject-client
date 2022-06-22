import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import register from "../views/register.vue";
import login from "../views/login.vue";
import listGunung from "../views/listGunung.vue";
import gunungById from "../views/gunungById.vue";
import postLicense from "../views/postLicense.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/register",
      name: "register",
      component: register,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/mountains",
      name: "listGunung",
      component: listGunung,
    },
    {
      path: "/mountains/:MountainId",
      name: "gunungById",
      component: gunungById,
    },
    {
      path: "/licenses",
      name: "",
    },
    {
      path: "/licenses/:MountainId/:QuotaId",
      name: "postLicense",
      component: postLicense,
    },
  ],
});

export default router;
