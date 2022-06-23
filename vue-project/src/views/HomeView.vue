<script>
import { mapActions, mapState } from "pinia";
import cardPackageVue from "../components/cardPackage.vue";
import headerVue from "../components/header.vue";
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
    headerVue,
    cardPackageVue,
  },
};
</script>

<template>
  <navbarVue />
  <headerVue />
  <cardPackageVue />
</template>

<style></style>
