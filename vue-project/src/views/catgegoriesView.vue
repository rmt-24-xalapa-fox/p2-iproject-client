<script>
import { mapState } from "pinia";
import navbarVue from "../components/navbar.vue";
import { useCounterStore } from "../stores/counter";
export default {
  name: "catgegoriesView",
  components: {
    navbarVue,
  },
  computed: {
    ...mapState(useCounterStore, ["data"]),
  },
};
</script>

<template>
  <navbarVue />
  <div class="container" style="margin-top: 10%">
    <div class="d-flex flex-wrap">
      <div
        v-for="(el, i) in data"
        key="i"
        style="margin-left: 1%; margin-right: 1%"
      >
        <img
          :src="el.largeImageURL"
          alt=""
          style="margin: 2%; width: 500px; height: 500px"
        />
        <div class="container d-flex">
          <p>
            <img
              src="../assets/like.png"
              alt=""
              style="width: 15px; height: 15px"
            />
            {{ el.likes }}
          </p>
          <p style="margin-left: 5%">
            <img
              src="../assets/eye.png"
              alt=""
              style="width: 15px; height: 15px"
            />
            {{ el.views }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
