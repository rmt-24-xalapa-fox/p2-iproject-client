<template>
  <div
    class="container-xl text-left page-heading align-items-left justify-content-center rounded"
    style="height: 100px; background-color: black"
  >
    <div class="row">
      <div
        style="color: white; margin-top: 30px; margin-left: 30px"
        class="col-12"
      >
        <h1 class="retrofont" style="font-size: 30px">My Digimon</h1>
      </div>
    </div>
  </div>

  <div
    class="container-xl text-center page-heading align-items-center d-flex justify-content-start border border-dark border-4 rounded"
    style="background-color: white"
  >
    <!-- asdasdas -->
    <div class="row justify-content-start">
      <div
        v-for="digimon in listMyDigimon"
        :key="digimon.name"
        class="card col-1"
        style="width: 165px; margin: 10px"
      >
        <img class="card-img-top" :src="digimon.img" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title retrofont" style="font-size: 0.7em">
            {{ digimon.name }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  methods: {
    ...mapActions(useMainStore, ["fetchListMyDigimon"]),
  },
  computed: {
    ...mapState(useMainStore, ["listMyDigimon"]),
  },
  created() {
    // console.log("masok");
    this.fetchListMyDigimon();
  },
};
</script>
