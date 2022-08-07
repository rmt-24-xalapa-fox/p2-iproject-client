<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../stores";
import card from "./card.vue";
export default {
  name: "homepage",
  data() {
    return {};
  },
  components: { card },
  methods: {
    ...mapActions(useMainStore, ["goToPage"]),
  },
  computed: {
    ...mapState(useMainStore, ["movies", "pages"]),
    ...mapWritableState(useMainStore, ["activePage"]),
  },
};
</script>

<template>
  <section
    id="homepage"
    class="flex pt-10 flex-col text-verdana gap-5 opacity-95 flex flex-col self-center justify-self-center font-verdana rounded mx-4 my-8"
  >
    <div class="space-x-1 w-full justify-between flex">
      <a
        class="px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-pointer"
        v-on:click="
          if (activePage !== 1) {
            goToPage(activePage - 1);
          }
        "
      >
        &laquo;
      </a>
      <a class="text-white self-center"
        >Current page: {{ activePage }} / {{ pages }}</a
      >
      <a
        class="px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-pointer"
        v-on:click="
          if (activePage !== pages) {
            goToPage(activePage + 1);
          }
        "
        >&raquo;</a
      >
    </div>

    <div
      class="grid grid-cols-4 gap-5 align-center justify-center px-5 bold text-lg rounded py-5"
    >
      <card
        @click="this.$router.push(`/${movie.id}`)"
        v-for="movie in movies"
        :movie="movie"
        :key="movie.id"
      />
    </div>
  </section>
</template>
