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
