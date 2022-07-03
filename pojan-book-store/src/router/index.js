import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import LoginView from "../views/LoginView.vue";
import WishlistsView from "../views/WishlistsView.vue";
import CartsView from "../views/CartsView.vue";
import ProductDetails from "../views/ProductDetails.vue";
import OrderReview from "../views/OrderReview.vue";
import OrderHistory from "../views/OrderHistory.vue";
import BookClub from "../views/BookClub.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/wishlists",
      name: "Wishlists",
      component: WishlistsView,
    },
    {
      path: "/carts",
      name: "Carts",
      component: CartsView,
    },
    {
      path: "/books/:bookId",
      name: "Book Details",
      component: ProductDetails,
    },
    {
      path: "/order-review",
      name: "Order Review",
      component: OrderReview,
    },
    {
      path: "/order",
      name: "Order History",
      component: OrderHistory,
    },
    {
      path: "/book-club",
      name: "Book Club",
      component: BookClub,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  if (
    to.name !== "Login" &&
    to.name !== "Register" &&
    to.name !== "Home" &&
    !isAuthenticated
  ) {
    next({ name: "Home" });
  } else if (
    (to.name === "Login" || to.name === "Register") &&
    isAuthenticated
  ) {
    next({ name: "Home" });
  } else next();
});

export default router;
