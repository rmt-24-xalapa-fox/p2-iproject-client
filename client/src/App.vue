<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

import { mapState, mapActions } from "pinia";
import { useMainStore } from "./stores";

export default {
  components: { Navbar },
  computed: {
    ...mapState(useMainStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useMainStore, ["setIsLogin"]),
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.setIsLogin(true);
    } else {
      this.setIsLogin(false);
    }
  },
};
</script>

<template>
  <Navbar v-if="isLogin == true" />
  <RouterView />
</template>
