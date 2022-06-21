<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

import { mapState } from "pinia";
import { useMainStore } from "./stores";

export default {
  components: { Navbar },
  computed: {
    ...mapState(useMainStore, ["isLogin"]),
  },
};
</script>

<template>
  <Navbar v-if="isLogin == true" />
  <RouterView />
</template>
