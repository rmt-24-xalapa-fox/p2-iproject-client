<script>
import { RouterLink } from "vue-router";

export default {
  name: "navbar",
  data() {
    return {
      access_token: "",
    };
  },
  components: {
    RouterLink,
  },
  created() {
    this.access_token = localStorage.getItem("access_token");
  },
};
</script>

<template>
  <nav class="navbar bg-light shadow fixed-top">
    <div class="container">
      <a class="navbar-brand">
        <img
          src="../assets/TRAVEL_TOURIS.png"
          alt=""
          style="width: 70px; height: 70px"
        />
        TRAVEL
      </a>
      <div class="d-flex">
        <div style="margin-right: 10%">
          <RouterLink href="" to="/">Home</RouterLink>
        </div>
        <div style="margin-right: 10%">
          <a href="">Contact</a>
        </div>
        <div v-if="!access_token">
          <button class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </nav>
  <svg
    style="position: absolute; z-index: -999"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="#0099ff"
      fill-opacity="1"
      d="M0,224L48,192C96,160,192,96,288,90.7C384,85,480,139,576,165.3C672,192,768,192,864,192C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    ></path>
  </svg>
</template>

<script></script>
