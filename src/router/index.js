import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BattleView from "../views/BattleView.vue";
import LeaderboardView from "../views/LeaderboardView.vue";
import StatisticView from "../views/StatisticView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/battle",
      name: "battle",
      component: BattleView,
    },
    {
      path: "/statistic",
      name: "statistic",
      component: StatisticView,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderboardView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
