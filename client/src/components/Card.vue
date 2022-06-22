<script>
import { mapState } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "Card",
  props: {
    hero: Object,
  },
  computed: {
    ...mapState(useHeroStore, ["heroes"]),
  },
};
</script>
<template>
  <div class="container px-4 px-lg-5 mt-5">
    <div class="row gx-4 gx-lg-3 row-cols-3 row-cols-md-5 row-cols-xl-4 justify-content-center">
      <div class="col mb-5" v-for="hero in heroes" :key="hero.id" :hero="hero">
        <div class="card h-40">
          <!-- Product image-->
          <img class="card-img-top" :src="hero.key" alt="..." />
        </div>
      </div>
    </div>
  </div>
</template>
