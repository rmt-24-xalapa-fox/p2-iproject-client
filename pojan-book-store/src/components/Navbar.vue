<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";
export default {
  methods: {
    ...mapActions(useStore, ["moveToRoute", "logoutHandler"]),
  },
  computed: {
    ...mapState(useStore, ["isLogin"]),
    path() {
      return this.$router.currentRoute.value.path;
    },
  },
};
</script>

<template>
  <div>
    <header class="header">
      <a href="#"> </a>

      <nav class="main-nav">
        <ul class="main-nav-list">
          <li @click="moveToRoute(`Home`)">
            <a class="main-nav-link" :class="{ active: path === '/' }" href="#"
              >Home</a
            >
          </li>
          <li v-if="!isLogin" @click="moveToRoute('Register')">
            <a class="main-nav-link" href="#">Register</a>
          </li>
          <li v-if="!isLogin" @click="moveToRoute('Login')">
            <a class="main-nav-link nav-cta" href="#">Login</a>
          </li>
          <li v-if="isLogin" @click="moveToRoute('Wishlists')">
            <a
              class="main-nav-link"
              :class="{ active: path === '/wishlists' }"
              href="#"
              >Wishlists</a
            >
          </li>
          <li v-if="isLogin" @click="moveToRoute('Carts')">
            <a
              class="main-nav-link"
              :class="{ active: path === '/carts' }"
              href="#"
              >Cart</a
            >
          </li>
          <li v-if="isLogin" @click="logoutHandler">
            <a class="main-nav-link nav-cta" href="#">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style></style>
