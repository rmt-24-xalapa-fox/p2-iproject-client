<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "Build",
  computed: {
    ...mapState(useHeroStore, ["buildList"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["getBuild"]),
  },
  created() {
    this.getBuild();
  },
};
</script>
<template>
  <!-- Section-->
  <section class="py-5" style="background-color: rgb(192, 131, 130)">
    <div class="py-5 container-fluid">
      <div class="py-3 row justify-content-start" v-for="build in buildList" :key="build.id" :build="build">
        <div class="col-2">
          <img :src="build.Hero.key" alt="" />
        </div>
        <div class="col-1">
          <img :src="build.item2.imgUrl" alt="" />
        </div>
        <div class="col-1">
          <img :src="build.item3.imgUrl" alt="" />
        </div>
        <div class="col-1">
          <img :src="build.item4.imgUrl" alt="" />
        </div>
        <div class="col-1">
          <img :src="build.item5.imgUrl" alt="" />
        </div>
        <div class="col-1">
          <img :src="build.item6.imgUrl" alt="" />
        </div>
        <div class="col-1">
          <img :src="build.item7.imgUrl" alt="" />
        </div>
      </div>
    </div>
  </section>

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Be Pro 2022</p></div>
  </footer>
</template>
