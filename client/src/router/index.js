import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import CartPage from '../views/CartPage.vue'
import ShipPayPage from '../views/ShipPayPage.vue'
import DetailPage from '../views/DetailPage.vue'
import HistoryPage from '@/views/HistoryPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: '/login',
      name: "login",
      component: LoginPage
    },
    {
      path: `/cart`,
      name: `cart`,
      component: CartPage
    },
    {
      path: `/shippay`,
      name: `shippay`,
      component: ShipPayPage
    }, {
      path: `/detail/:id`,
      name: `detail`,
      component: DetailPage
    },
    {
      path: `/collection`,
      name: `history`,
      component: HistoryPage
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },

  ],
});

router.beforeEach((to, from, next) => {

  if ((to.name == 'cart' || to.name == `shippay` || to.name == `history`) && !localStorage.getItem('access_token')) {

    next("/")

  }
  else if (to.name == 'login' && localStorage.getItem('access_token')) {
    next("/")

  }
  else if (to.name == 'register' && localStorage.getItem('access_token')) {

    next("/")

  }
  next()
})

export default router;
