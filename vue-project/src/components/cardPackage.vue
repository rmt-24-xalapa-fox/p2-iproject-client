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
</template>

<style></style>
