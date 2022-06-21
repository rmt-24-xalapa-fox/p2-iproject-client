<template>
  <!-- BANNER GACHA START -->
  <div
    class="container-xl text-left page-heading align-items-left justify-content-center rounded"
    style="height: 100px; background-color: black; margin-top: 60px"
  >
    <div class="row me-auto">
      <div
        style="color: white; margin-top: 30px; margin-left: 30px"
        class="col-10"
      >
        <h1 class="retrofont" style="font-size: 30px">Gacha Digimon</h1>
      </div>
      <div
        style="color: white; margin-top: 30px; margin-left: 20px"
        class="col-1 align-items-right"
      >
        <button
          @click="clickGachaDigimon"
          style="width: 110px"
          class="btn btn-primary"
        >
          100 Koin
        </button>
      </div>
    </div>
  </div>
  <!-- BANNER GACHA END -->

  <!-- Fresh LIST -->
  <div
    class="container-xl text-center page-heading align-items-center d-flex justify-content-center border border-dark border-4 rounded"
    style="background-color: black; margin-top: 40px"
  >
    <h1 style="color: white; margin-top: 10px" class="retrofont">
      FRESH - 40%
    </h1>
  </div>

  <!-- <div class="row justify-content-center">ASDAS</div> -->
  <div
    class="container-xl text-center page-heading align-items-center d-flex justify-content-start border border-dark border-4 rounded"
    style="background-color: white"
  >
    <!-- asdasdas -->
    <div class="row justify-content-start">
      <!-- CARD START -->
      <div
        v-for="fresh in listFresh"
        :key="fresh.name"
        class="card col-1"
        style="width: 165px; margin: 10px"
      >
        <img class="card-img-top" :src="fresh.img" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title retrofont" style="font-size: 0.7em">
            {{ fresh.name }}
          </h5>
        </div>
      </div>
      <!-- CARD END -->
    </div>
  </div>

  <!--Fresh LIST END -->

  <!-- In Training LIST -->
  <div
    class="container-xl text-center page-heading align-items-center d-flex justify-content-center border border-dark border-4 rounded"
    style="background-color: black"
  >
    <h1 style="color: white; margin-top: 10px" class="retrofont">
      IN TRAINING - 30%
    </h1>
  </div>

  <!-- <div class="row justify-content-center">ASDAS</div> -->
  <div
    class="container-xl text-center page-heading align-items-center d-flex justify-content-start border border-dark border-4 rounded"
    style="background-color: white"
  >
    <!-- asdasdas -->
    <div class="row justify-content-start">
      <!-- CARD START -->
      <div
        v-for="intraining in listInTraining"
        :key="intraining.name"
        class="card col-1"
        style="width: 165px; margin: 10px"
      >
        <img class="card-img-top" :src="intraining.img" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title retrofont" style="font-size: 0.7em">
            {{ intraining.name }}
          </h5>
        </div>
      </div>
      <!-- CARD END -->
    </div>
  </div>

  <!-- In Training LIST END -->

  <!-- ROOKIE LIST -->
  <div
    class="container-xl text-center page-heading align-items-center d-flex justify-content-center border border-dark border-4 rounded"
    style="background-color: black"
  >
    <h1 style="color: white; margin-top: 10px" class="retrofont">
      ROOKIE - 30%
    </h1>
  </div>

  <!-- <div class="row justify-content-center">ASDAS</div> -->
  <div
    class="container-xl text-center page-heading align-items-center d-flex justify-content-start border border-dark border-4 rounded"
    style="background-color: white"
  >
    <!-- asdasdas -->
    <div class="row justify-content-start">
      <!-- CARD START -->
      <div
        v-for="rookie in listRookie"
        :key="rookie.name"
        class="card col-1"
        style="width: 165px; margin: 10px"
      >
        <img class="card-img-top" :src="rookie.img" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title retrofont" style="font-size: 0.7em">
            {{ rookie.name }}
          </h5>
        </div>
      </div>
      <!-- CARD END -->

      <!-- CARD END -->
    </div>
  </div>

  <!-- ROOKIE LIST END -->
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  computed: {
    ...mapState(useMainStore, ["listFresh", "listInTraining", "listRookie"]),
  },
  methods: {
    ...mapActions(useMainStore, ["fetchListDigimon", "gachaDigimon"]),
    clickGachaDigimon: function () {
      this.gachaDigimon();
    },
  },
  created() {
    this.fetchListDigimon();
  },
};
</script>
