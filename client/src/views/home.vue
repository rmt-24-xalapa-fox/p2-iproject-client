<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores";
import slider from "../components/slider.vue";
export default {
  name: "home",
  components: {
    slider,
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchWeather"]),
  },
  computed: {
    ...mapState(useIndexStore, ["weather"]),
  },
  created() {
    this.fetchWeather();
  },
};
</script>

<template>
  <div class="menu row">
    <div class="col-3 border sidebar">
      <h3 class="middle">Perkiraan Cuaca</h3>
      <hr />
      <div v-for="(el, i) in weather" :key="i">
        <h6>Cuaca di Kota Gunung {{ el.name }}</h6>
        <p class="middle">Cuaca: {{ el.data.suhu }}</p>
        <p class="middle">Kondisi: {{ el.data.kelembapan }}</p>
      </div>
    </div>
    <slider />
  </div>
</template>

<style scoped>
.sidebar {
  background: #aeabab;
  padding: 20px;
  color: white;
  min-height: 100vh;
}
.sidebar h6 {
  font-size: 20px;
  margin: 10px;
}
.middle {
  display: flex;
  justify-content: center;
}
</style>
