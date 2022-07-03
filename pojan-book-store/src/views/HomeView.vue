<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
import ProductsList from "../components/ProductsList.vue";
import NoProductFound from "../components/NoProductFound.vue";
export default {
  name: "HomeView",
  components: {
    Navbar,
    HeroSection,
    ProductsList,
    NoProductFound,
  },
  data() {
    return {
      filterObj: {
        categoryId: [],
        minPrice: null,
        maxPrice: null,
        name: null,
      },
    };
  },
  methods: {
    ...mapActions(useStore, [
      "fetchBooks",
      "fetchWishlists",
      "fetchCategories",
    ]),
    clickPagination(value) {
      this.fetchBooks({ ...this.filterObj, page: value });
    },
    submitFilter(obj) {
      this.fetchBooks(obj);
    },
    clearFilter() {
      this.filterObj.categoryId = [];
      this.filterObj.minPrice = null;
      this.filterObj.maxPrice = null;
      this.filterObj.name = null;
    },
  },
  computed: {
    ...mapState(useStore, ["booksObj", "books", "wishlists", "categories"]),
  },
  created() {
    this.fetchBooks({});
    this.fetchCategories();
    if (localStorage.getItem("accessToken")) {
      this.fetchWishlists();
    }
  },
};
</script>

<template>
  <div>
    <Navbar />
    <main>
      <HeroSection title="Pojan Book Store" subtitle="Happy Shopping!" />

      <div class="main-content">
        <form
          @submit.prevent="submitFilter(filterObj)"
          class="filter-container"
        >
          <div class="filter-container--category">
            <h4>Book Category</h4>
            <div class="line-separator"></div>
            <div
              v-for="category in categories"
              :key="category.id"
              class="category-row"
            >
              <input
                v-model="filterObj.categoryId"
                :value="category.id"
                class="checkbox"
                type="checkbox"
                name="category"
                :id="category.name"
              />
              <label :for="category.name">{{ category.name }}</label>
            </div>
          </div>

          <div class="filter-container--price">
            <h4>Price</h4>
            <div class="line-separator"></div>
            <div class="rupiah-box">
              <p class="rp">Rp.</p>
              <input
                v-model="filterObj.minPrice"
                class="input-full"
                type="text"
                placeholder="minimum price"
              />
            </div>
            <div class="rupiah-box">
              <p class="rp">Rp.</p>
              <input
                v-model="filterObj.maxPrice"
                class="input-full"
                type="text"
                placeholder="maximum price"
              />
            </div>
          </div>

          <div class="filter-container--name">
            <h4>Book Title</h4>
            <div class="line-separator"></div>
            <input
              v-model="filterObj.name"
              class="input-full"
              type="text"
              name=""
              id=""
              placeholder="book title"
            />
          </div>

          <button type="submit" class="btn">Search</button>
          <button @click="clearFilter" class="btn clear-btn">Clear</button>
        </form>
        <ProductsList
          v-if="booksObj.totalItems !== 0"
          :theBooks="books"
          theClass="main-container"
        />
        <div v-if="booksObj.totalItems === 0">
          <NoProductFound title="No books meet your criteria" />
        </div>
      </div>

      <div v-if="booksObj.totalItems !== 0" class="pagination-container">
        <button
          @click="clickPagination(booksObj.currentPage - 1)"
          v-if="booksObj.currentPage !== 0"
          class="btn btn-pagination"
        >
          Previous
        </button>
        <button
          @click="clickPagination(index - 1)"
          v-for="index in booksObj.totalPages"
          :key="index"
          class="btn btn-pagination"
          :class="{ active: index === booksObj.currentPage + 1 }"
        >
          {{ index }}
        </button>
        <button
          @click="clickPagination(booksObj.currentPage + 1)"
          v-if="booksObj.currentPage !== booksObj.totalPages - 1"
          class="btn btn-pagination"
        >
          Next
        </button>
      </div>
    </main>
  </div>
</template>

<style></style>
