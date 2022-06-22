<script>
import { mapActions, mapState } from "pinia";
import navbarVue from "../components/navbar.vue";
import { useCounterStore } from "../stores/counter";

export default {
  data() {
    return {
      location: "",
      data: "",
    };
  },
  components: {
    navbarVue,
  },
  computed: {
    ...mapState(useCounterStore, ["map"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["findMap"]),
    async find() {
      let res = await this.findMap(this.location);
      const { lat, lng } = res.location;
      this.data = `https://api.maptiler.com/maps/e335f49c-b410-4b3a-ad43-c57425e058c8/?key=acVZ15jdGumikR4TcSxG#8.2/${lat}/${lng}`;
    },
  },
};
</script>

<template>
  <navbarVue />
  <div>
    <form action="" @submit.prevent="find">
      <label for="">Location</label>
      <input type="text" v-model="location" />
      <button type="submit">find</button>
    </form>
  </div>
  <div style="justify-content: center">
    <iframe width="500" height="500" :src="data"></iframe>
  </div>
</template>

<style></style>
