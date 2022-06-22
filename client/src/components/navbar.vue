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
  <!-- Nabar -->
  <nav class="col-12">
    <div class="header">
      <div class="judul">
        <h1 @click.prevent="toHomePage">Integrasi Simaksi Online</h1>
      </div>
      <div class="menu">
        <router-link
          to="/mountains"
          class="pointer"
          style="text-decoration: none"
          >List Gunung</router-link
        >
        <router-link
          to="/licenses"
          class="pointer"
          style="text-decoration: none"
          >My License</router-link
        >
        <a
          @click.prevent="logoutPage"
          v-if="isLogin"
          class="pointer"
          style="text-decoration: none"
          >Logout</a
        >
        <router-link
          to="/login"
          v-if="!isLogin"
          class="pointer"
          style="text-decoration: none"
          >Login</router-link
        >
      </div>
    </div>
  </nav>
  <!-- End Nabar -->
</template>

<style scoped>
/* navbar */
.header {
  display: flex;
  padding: 10px;
  background: #000000;
  color: white;
  font-size: 30px;
  min-width: 100vw;
}
.header a {
  padding-left: 30px;
  padding-right: 30px;
  color: white;
}
.pointer {
  cursor: pointer;
}
.header h1 {
  margin-left: 20px;
  margin-right: 20px;
}
/* end navbar */
</style>
