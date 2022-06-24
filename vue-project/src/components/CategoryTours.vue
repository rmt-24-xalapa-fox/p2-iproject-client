<script>
import { mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "CategoryTours",

  methods: {
    ...mapActions(useCounterStore, ["categories"]),
    async findTour(value) {
      let res = await this.categories(value);
      if (res) {
        this.$router.push("/categories");
      }
    },
  },
};
</script>

<template>
  <div class="container" style="margin-top: 2%">
    <h3>Gallery</h3>
  </div>
  <div class="container d-flex" style="margin: 4%">
    <a href="" style="margin-left: 2%" @click.prevent="findTour('beach')">
      <div class="card text-white" style="width: 200px">
        <img src="../assets/pantai2.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">Beach</h5>
        </div>
      </div>
    </a>
    <a href="" @click.prevent="findTour('mountain')">
      <div class="card text-white" style="width: 200px">
        <img src="../assets/gunung.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">Mountain</h5>
        </div>
      </div>
    </a>
    <a href="" @click.prevent="findTour('valley')">
      <div class="card text-white" style="width: 200px">
        <img src="../assets/valley.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">Valley</h5>
        </div>
      </div>
    </a>
    <a href="" @click.prevent="findTour('cliff')">
      <div class="card text-white" style="width: 200px">
        <img src="../assets/cliff.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">Cliff</h5>
        </div>
      </div>
    </a>
    <a href="" @click.prevent="findTour('forest')">
      <div class="card text-white" style="width: 200px">
        <img src="../assets/forest.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">Forest</h5>
        </div>
      </div>
    </a>
  </div>
</template>

<style>
.card {
  overflow: hidden;
}
img {
  height: 150px;
}
a {
  margin-right: 2%;
}
</style>
