<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../stores";
export default {
  name: "homepage",
  data() {
    return {};
  },
  methods: {
    ...mapActions(useMainStore, ["gotoPage"]),
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
    class="flex flex-col text-verdana gap-5 opacity-95 flex flex-col self-center justify-self-center font-verdana rounded mx-4 my-8"
  >
    <div
      class="grid grid-cols-4 gap-5 align-center justify-center px-5 bold text-lg rounded py-5"
    ></div>
  </section>
</template>
