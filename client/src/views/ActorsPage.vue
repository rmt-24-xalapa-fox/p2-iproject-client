<script>
import TheActorsCard from "../components/TheActorsCard.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { actorsStore } from "../stores/actors";

export default {
  name: "ActorsPage",
  components: { TheActorsCard },
  computed: {
    ...mapState(actorsStore, ["actors", "currentPage"]),
    ...mapWritableState(actorsStore, [""]),
  },
  methods: {
    ...mapActions(actorsStore, ["fetchActors", "next", "previous"]),
  },
  created() {
    this.fetchActors(this.currentPage);
    this.next()
    this.previous()
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-yellow-500 text-lg font-semibold">POPULAR ACTORS</h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <TheActorsCard
        v-for="actor in actors"
        :key="actor.id"
        :actor="actor"
      />
    </div>
    <!-- PAGINATION -->
    <div class="text-center mt-5">
      <a href="" v-on:click.prevent="previous"> Previous </a>
      <a href="" v-on:click.prevent="next" class="ml-5"> Next </a>
    </div>
  </div>
</template>

<style></style>
