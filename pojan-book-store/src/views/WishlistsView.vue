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
    ...mapActions(useStore, ["fetchWishlists"]),
  },
  computed: {
    ...mapState(useStore, ["wishlists", "isLogin"]),
    productsInWishlist() {
      return this.wishlists.map((el) => el.Book);
    },
  },
  created() {
    this.fetchWishlists();
  },
};
</script>
<template>
  <div>
    <Navbar />
    <HeroSection title="My Wishlists" />
    <ProductsList
      v-if="productsInWishlist"
      :theProducts="productsInWishlist"
      class="wishlist-container"
    />
    <NoProductFound
      v-if="productsInWishlist.length === 0"
      title="No wishlists yet"
    />
  </div>
</template>

<style></style>
