<script>
import navbar from "./components/navbar.vue";
import { mapActions, mapWritableState } from "pinia";
import { useMainStore } from "./stores";

export default {
  components: {
    navbar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(useMainStore, ["loggedIn", "userData", "access_token"]),
  },
  methods: {
    ...mapActions(useMainStore, ["getMovies"]),
    // async getCategories() {
    //   try {
    //     const access_token = this.accessToken;
    //     const response = await this.axios.get(
    //       "http://localhost:3000/categories",
    //       {
    //         headers: {
    //           access_token,
    //         },
    //       }
    //     );
    //     this.categories = response.data.data;
    //   } catch (err) {
    //     this.errorHandler(err);
    //   }
    // },
  },
  created() {
    const accessToken = localStorage.getItem("access_token");
    this.getMovies();
    if (accessToken) {
      this.access_token = accessToken;
      this.loggedIn = true;
    }
  },
};
</script>

<template class="m-0 p-0 top-0 bottom-0">
  <div
    class="min-h-[100vh] flex flex-row bg-fixed bg-movie-visual bg-cover justify-center align-center"
  >
    <navbar />
    <router-view />
  </div>
</template>

<style></style>
