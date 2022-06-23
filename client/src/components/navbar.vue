<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useIndexStore } from "../stores";
export default {
  name: "navbar",
  methods: {
    ...mapActions(useIndexStore, ["logoutStore"]),
    logoutPage() {
      this.logoutStore();
      this.$router.push("/login");
    },
    toHomePage() {
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(useIndexStore, ["isLogin"]),
    ...mapWritableState(useIndexStore, ["isLogin"]),
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
};
</script>

<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container">
      <!-- Navbar brand -->
      <router-link to="/" class="navbar-brand me-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/619/619010.png"
          height="25"
          alt="Mountain Logo"
          style="margin-top: -1px"
        />
        <h5 class="mt-3 ml-2">Simaksi Online</h5>
      </router-link>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarButtonsExample">
        <!-- Left links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/mountains" class="nav-link mt-2" href="#"
              >List Gunung</router-link
            >
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link to="/licenses" class="nav-link mt-2" href="#"
              >My License</router-link
            >
          </li>
        </ul>
        <!-- Left links -->

        <div class="d-flex align-items-center">
          <router-link
            v-if="!isLogin"
            to="/login"
            type="button"
            class="btn btn-primary me-3"
            >Login</router-link
          >
          <a
            @click.prevent="logoutPage"
            v-if="isLogin"
            to="/logout"
            type="button"
            class="btn btn-primary me-3"
            >Logout</a
          >
        </div>
      </div>
      <!-- Collapsible wrapper -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</template>

<style scoped></style>
