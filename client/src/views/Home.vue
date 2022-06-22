<script>
import { mapState } from "pinia";
import { useHeroStore } from "../stores/heroes";
import Cards from "../components/Card.vue";
export default {
  name: "Home",
  components: {
    Cards,
  },
  computed: {
    ...mapState(useHeroStore, ["heroes"]),
  },
};
</script>

<template>
  <!-- Section-->
  <section class="py-5" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-dark fw-bold active" aria-current="page">All</button>
          <button type="button" class="btn btn-outline-dark fw-bold">Tank</button>
          <button type="button" class="btn btn-outline-dark fw-bold">Fighter</button>
          <button type="button" class="btn btn-outline-dark fw-bold">Assassin</button>
          <button type="button" class="btn btn-outline-dark fw-bold">Mage</button>
          <button type="button" class="btn btn-outline-dark fw-bold">Marksman</button>
          <button type="button" class="btn btn-outline-dark fw-bold">Support</button>
        </div>
      </div>
    </div>

    <Cards />
  </section>

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2022</p></div>
  </footer>
</template>
