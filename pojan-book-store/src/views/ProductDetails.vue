<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
export default {
  name: "ProductDetails",
  components: {
    Navbar,
    HeroSection,
  },
  methods: {
    ...mapActions(useStore, ["fetchOneBook"]),
  },
  computed: {
    ...mapState(useStore, ["book"]),
    formatRupiah() {
      return this.book.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
    },
  },
  created() {
    const bookId = this.$route.params.bookId;
    if (!this.book) {
      this.fetchOneBook(bookId);
    }
  },
};
</script>

<template>
  <div v-if="book">
    <Navbar />
    <main>
      <HeroSection :title="book.title" />
      <div class="product-details-container">
        <div class="book-details-img">
          <img :src="book.imageUrl" alt="" />
        </div>
        <div class="book-details-container">
          <div class="book-details">
            <p class="book-details-title">Book Title</p>
            <p class="book-details-content">{{ book.title }}</p>
          </div>
          <div>
            <p class="book-details-title">Book Author</p>
            <p class="book-details-content">{{ book.author }}</p>
          </div>
          <div>
            <p class="book-details-title">Book Category</p>
            <p class="book-details-content">{{ book.Category.name }}</p>
          </div>

          <div>
            <p class="book-details-title">Book Price</p>
            <p class="book-details-content">{{ formatRupiah }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style></style>
