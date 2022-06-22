<script>
import { mapActions } from "pinia";
import { useHeroStore } from "./stores/heroes";
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
    RouterView,
  },
  methods: {
    ...mapActions(useHeroStore, ["fetchHeroes"]),
  },
  async created() {
    await this.fetchHeroes();
  },
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>
