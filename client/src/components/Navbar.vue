<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";
export default {
  name: "Home",
  methods: {
    ...mapActions(useCounter, [
      "clickHome",
      "clickProducts",
      "clickSales",
      "createChart",
      "clickIngredients",
    ]),
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand navbar-light bg-light fixed-top"
    style="background-color: #ffb703 !important"
  >
    <div class="container">
      <ul class="navbar-nav mb-lg-0">
        <li class="nav-item">
          <a
            class="nav-link text-white"
            aria-current="page"
            href="#"
            @click="clickHome"
            >Home</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white"
            aria-current="page"
            href="#"
            @click="clickProducts"
            >Products</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white"
            aria-current="page"
            href="#"
            @click="clickSales"
            >Sales</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white"
            aria-current="page"
            href="#"
            @click="clickIngredients"
            >Ingredients</a
          >
        </li>
      </ul>
    </div>
  </nav>
  <footer class="footer fixed-bottom" style="background-color: #ffb703">
    <div class="my-auto">
      <div class="copyright text-center my-auto">
        <span>Copyright GalihSadhira</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  margin-left: 2px;
}
</style>
