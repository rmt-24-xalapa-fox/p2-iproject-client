<script>
import { RouterView } from "vue-router";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useMainStore } from "./stores/store";

export default {
  components: {
    RouterView,
  },
  computed: {
    ...mapState(useMainStore, [""]),
    ...mapWritableState(useMainStore, [""]),
  },
  methods: {
    ...mapActions(useMainStore, [""]),
  },
  created() {},
};
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <RouterView />
</template>

<style></style>
