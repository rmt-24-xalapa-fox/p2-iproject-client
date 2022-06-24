import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";
import Tutorial from "../views/Tutorial.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Add from "../views/AddBuild.vue";
import Build from "../views/BuildItem.vue";
import ErrorPage from "../views/ErrorPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: Detail,
    },
    {
      path: "/tutorial",
      name: "tutorial",
      component: Tutorial,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/add",
      name: "add",
      component: Add,
    },
    {
      path: "/build",
      name: "build",
      component: Build,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "errPage",
      component: ErrorPage,
    },
  ],
});

router.beforeEach((to, from) => {
  let isLogin = localStorage.getItem("access_token");
  if (!isLogin && to.name === "add") {
    Swal.fire({
      icon: "error",
      title: `Oops...`,
      text: `Please login to access this feature`,
    });
    return { name: "home" };
  } else if (!isLogin && to.name === "build") {
    Swal.fire({
      icon: "error",
      title: `Oops...`,
      text: `Please login to access this feature`,
    });
    return { name: "home" };
  }
  return true;
});

export default router;
