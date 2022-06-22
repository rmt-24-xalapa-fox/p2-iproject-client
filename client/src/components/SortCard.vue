<script>
import { mapState } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "SortCard",
  computed: {
    ...mapState(useHeroStore, ["sortByRole"]),
  },
};
</script>
<template>
  <div class="container px-4 px-lg-5 mt-5">
    <div class="row gx-4 gx-lg-3 row-cols-5 row-cols-md-4 row-cols-xl-5 justify-content-center">
      <div class="col-3 mb-3" v-for="sort in sortByRole" :key="sort.id" :sort="sort">
        <div class="h-40">
          <!-- Product image-->
          <a href="">
            <img class="card-img-top border border-5 border-dark rounded-circle" :src="sort.key" alt="..." />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
