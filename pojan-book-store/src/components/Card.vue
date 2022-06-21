<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "../stores/store";
export default {
  name: "Card",
  props: ["book"],

  methods: {
    ...mapActions(useStore, [
      "addWishlists",
      "removeWishlists",
      "fetchOneBook",
    ]),
    toggleWishlist(bookId) {
      if (!this.isInWishlist) {
        this.addWishlists(bookId);
      } else {
        this.removeWishlists(bookId);
      }
    },
  },
  computed: {
    ...mapState(useStore, ["isLogin", "wishlists"]),
    formatRupiah() {
      return this.book.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
    },
    isInWishlist() {
      return this.wishlists.some((wishlist) => {
        return wishlist.BookId === this.book.id;
      });
    },
  },
};
</script>

<template>
  <div class="card-component">
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img :src="book.imageUrl" alt="Avatar" />
        </div>
        <div class="flip-card-back">
          <div class="label-container">
            <h3 class="label">Book Title</h3>
            <p class="content">{{ book.title }}</p>
          </div>

          <div class="label-container">
            <h3 class="label">Category</h3>
            <p class="content">{{ book.Category.name }}</p>
          </div>

          <div class="label-container">
            <h3 class="label">Price</h3>
            <p class="content">{{ formatRupiah }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="after-card">
      <button @click="fetchOneBook(book.id)" class="btn btn-card">
        See Details
      </button>
      <div
        @click.prevent="toggleWishlist(book.id)"
        v-if="isLogin"
        class="icon-box"
      >
        <i
          class="icon-love fa-solid fa-heart"
          :class="{ active: isInWishlist }"
        ></i>
      </div>
    </div>
  </div>
</template>

<style></style>
