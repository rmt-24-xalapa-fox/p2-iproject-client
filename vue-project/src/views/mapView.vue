<script>
import { mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import navbarVue from "../components/navbar.vue";

export default {
  name: "map",
  components: {
    navbarVue,
  },
  computed: {
    ...mapState(useCounterStore, ["map", "oneData"]),
  },
};
</script>

<template>
  <navbarVue />
  <div
    style="
      width: 700px;
      height: 500px;
      overflow: hidden;
      margin: auto;
      margin-top: 5%;
    "
  >
    <img :src="oneData.imageUrl" alt="" style="margin: auto" />
  </div>
  <div class="d-flex container" style="margin: 5%">
    <div class="col-6">
      <h3>{{ oneData.name }}</h3>
      <h5>{{ oneData.location }}</h5>
      <br />
      <p>{{ oneData.description }}</p>
    </div>
    <div class="col-6">
      <iframe height="100%" width="100%" :src="map"></iframe>
    </div>
  </div>
</template>

<style></style>
