<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "Card",
  props: {
    hero: Object,
  },
  computed: {
    ...mapState(useHeroStore, ["heroes"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["detailHero"]),
    toDetail(id) {
      this.$router.push(`/detail/${id}`);
      this.detailHero(id);
    },
  },
};
</script>
<template>
  <div class="container px-4 px-lg-5 mt-5">
    <div class="row gx-4 gx-lg-3 row-cols-5 row-cols-md-4 row-cols-xl-5 justify-content-center">
      <div class="col-3 mb-3" v-for="hero in heroes" :key="hero.id" :hero="hero">
        <div class="h-40">
          <!-- Product image-->
          <a href="" @click.prevent="toDetail(hero.heroid)">
            <img class="img-fluid card-img-top border border-5 border-dark rounded-circle" :src="hero.key" alt="..." />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
