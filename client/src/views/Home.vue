<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
import { RouterLink } from "vue-router";
import Cards from "../components/Card.vue";
import SortCard from "../components/SortCard.vue";
export default {
  name: "Home",
  components: {
    Cards,
    SortCard,
    RouterLink,
  },
  computed: {
    ...mapState(useHeroStore, ["roles", "sortByRole"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["fetchByRoles", "fetchHeroes"]),
    toHome() {
      this.fetchHeroes();
    },
  },
  created() {
    this.fetchHeroes();
    this.fetchByRoles();
  },
};
</script>

<template>
  <!-- Section-->
  <section class="py-5" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-dark fw-bold" v-for="role in roles" :key="role.id" :role="role" @click.prevent="fetchByRoles(role.label)">{{ role.label }}</button>
        </div>
      </div>
    </div>

    <Cards v-if="sortByRole.length === 0" />
    <SortCard />
  </section>

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Be Pro 2022</p></div>
  </footer>
</template>
