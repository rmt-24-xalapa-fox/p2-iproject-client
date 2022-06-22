<template>
  <nav class="w-screen bg-white px-20 py-3 shadow-md">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link
        class="font-poppins font-extrabold text-2xl text-rose-600 hover:text-rose-700 leadin"
        to="/"
      >
        ColorSrc
      </router-link>
      <div v-if="isLogin">
        <button
          id="dropdownButton"
          @click.prevent="toggleDropdown"
          class="justify-center py-2 px-4 border-transparent rounded-md shadow-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Menu
        </button>

        <div
          class="-ml-9 absolute hidden flex-col rounded bg-white px-4 py-4 gap-4 shadow-lg w-28"
          id="dropdown"
        >
          <router-link to="/profile/edit" class="hover:font-medium"
            >Edit profile</router-link
          >
          <a
            v-if="user.plan === 'Free'"
            href=""
            @click.prevent="upgradePlan"
            class="hover:font-medium"
            >Upgrade</a
          >
          <a href="#" @click.prevent="logoutHandler" class="hover:font-medium"
            >Logout</a
          >
        </div>
      </div>
      <div v-else>
        <router-link
          class="justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          :to="{ name: `${CTAAuth}` }"
        >
          {{ CTAAuth }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../stores/main";

export default {
  name: "Navbar",
  computed: {
    ...mapWritableState(useMainStore, ["isLogin"]),
    ...mapState(useMainStore, ["user"]),
    CTAAuth() {
      const currentPageName = this.$route.name;
      let CTAAuth = "";
      if (currentPageName === "Login") {
        CTAAuth = "Register";
      } else if (currentPageName === "Register") {
        CTAAuth = "Login";
      }
      return CTAAuth;
    },
  },
  methods: {
    ...mapActions(useMainStore, ["upgradePlan"]),
    logoutHandler() {
      this.isLogin = false;
      localStorage.clear();
      this.$router.push("/login");
    },
    toggleDropdown() {
      if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
        dropdown.classList.add("flex");
      } else {
        dropdown.classList.remove("flex");
        dropdown.classList.add("hidden");
      }
    },
  },
};
</script>

<style scoped></style>
