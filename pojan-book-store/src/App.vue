<script>
import { RouterView } from "vue-router";
import { mapWritableState } from "pinia";
import { useStore } from "@/stores/store";
export default {
  name: "App",
  components: {
    RouterView,
  },
  computed: {
    ...mapWritableState(useStore, ["isLogin", "accessToken"]),
  },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.isLogin = true;
      this.accessToken = localStorage.getItem("accessToken");
    }
  },
};
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style>
@import "./assets/style.css";
</style>
