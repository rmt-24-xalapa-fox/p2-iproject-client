<template>
  <NavbarComponent />
  <RouterView />
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { mapActions, mapState } from "pinia";
import NavbarComponent from "./components/NavbarComponent.vue";
import { useUserStore } from "@/stores/user";
export default {
  components: { NavbarComponent },
  methods: {
    ...mapActions(useUserStore, ["setIsLogin"]),
  },
  computed: {
    ...mapState(useUserStore, ["isLogin"]),
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.setIsLogin(true);
    }
  },
};
</script>

<style>
body {
  background-color: #f7faff;
}
</style>
