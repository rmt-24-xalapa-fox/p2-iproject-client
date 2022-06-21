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
    <HeroSection title="My Wishlists" />
    <ProductsList
      v-if="productsInWishlist"
      :theBooks="productsInWishlist"
      class="wishlist-container"
    />
    <NoProductFound
      v-if="productsInWishlist.length === 0"
      title="No wishlists yet"
    />
  </div>
</template>

<style></style>
