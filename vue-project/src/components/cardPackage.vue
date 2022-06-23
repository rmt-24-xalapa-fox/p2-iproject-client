<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "cards",
  computed: {
    ...mapState(useCounterStore, ["dataTour"]),
    ...mapWritableState(useCounterStore, ["map"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["findMap", "fetchOneData"]),
    async find(value1, value2) {
      let res = await this.findMap(value1);
      await this.fetchOneData(value2);
      const { lat, lng } = res.location;
      this.map = `https://api.maptiler.com/maps/e335f49c-b410-4b3a-ad43-c57425e058c8/?key=acVZ15jdGumikR4TcSxG#8.2/${lat}/${lng}`;
      this.$router.push("/map");
    },
  },
};
</script>

<template>
  <div>
    <h3 style="text-align: center; margin: 5%">List Tour Package</h3>
    <div class="d-flex container align-content-start flex-wrap">
      <div
        v-for="data in dataTour"
        key="data.id"
        class="card mb-3 shadow"
        style="
          max-width: 520px;
          overflow: hidden;
          margin-right: 1%;
          margin-left: 1%;
        "
      >
        <img :src="data.imageUrl" alt="" style="width: 550px; height: 400px" />
        <div class="row g-0">
          <div>
            <div class="card-body">
              <h5 class="card-title">{{ data.name }}</h5>
              <h6>{{ data.location }}</h6>
              <br />
              <h6>Rp. {{ data.price }}</h6>
              <br />
              <p class="card-text">
                {{ data.facility }}
              </p>
              <p class="card-text">
                <small class="text-muted"
                  >Last updated {{ data.updatedAt }} ago</small
                >
              </p>
            </div>
            <div class="d-flex" style="justify-content: center; margin: 5%">
              <div>
                <button
                  class="btn btn-outline-primary"
                  @click="find(data.name, data.id)"
                >
                  Detail
                </button>
              </div>
              <div>
                <button class="btn btn-outline-success">order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-bottom: -20%">
    <p style="text-align: center">@ 2022 - Arizal Fikri</p>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    style="position: absolute; z-index: -999"
  >
    <path
      fill="#0099ff"
      fill-opacity="1"
      d="M0,96L80,128C160,160,320,224,480,234.7C640,245,800,203,960,192C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
    ></path>
  </svg>
</template>

<style></style>
