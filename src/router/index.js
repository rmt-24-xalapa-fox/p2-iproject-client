import { createRouter, createWebHistory } from "vue-router";
import Chat from "../views/Chat.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import SignUp from "../views/SignUp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Chat,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
  ],
});

export default router;
