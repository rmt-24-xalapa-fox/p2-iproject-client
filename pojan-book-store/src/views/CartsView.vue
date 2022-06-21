<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";
import HeroSection from "../components/HeroSection.vue";
import ProductsList from "../components/ProductsList.vue";
import NoProductFound from "../components/NoProductFound.vue";
export default {
  name: "WishlistView",
  components: {
    Navbar,
    Card,
    HeroSection,
    ProductsList,
    NoProductFound,
  },
  methods: {
    ...mapActions(useStore, ["fetchCarts"]),
  },
  computed: {
    ...mapState(useStore, ["carts", "isLogin"]),
    productsInCarts() {
      return this.carts.map((el) => el.Book);
    },
  },
  created() {
    this.fetchCarts();
  },
};
</script>
<template>
  <div>
    <Navbar />
    <HeroSection title="My Cart" />
    <div class="checkout-container">
      <button class="btn btn-card btn-checkout">Checkout</button>
    </div>
    <ProductsList
      v-if="productsInCarts"
      :theBooks="productsInCarts"
      class="wishlist-container"
    />
    <NoProductFound
      v-if="productsInCarts.length === 0"
      title="Your cart is empty"
    />
  </div>
</template>

<style></style>
