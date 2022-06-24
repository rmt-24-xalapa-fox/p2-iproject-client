<script>
import cardPackageVue from "../components/cardPackage.vue";
import headerVue from "../components/header.vue";
import navbarVue from "../components/navbar.vue";
import CategoryToursVue from "../components/CategoryTours.vue";
import footerVue from "../components/footer.vue";

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
    CategoryToursVue,
    footerVue,
  },
};
</script>

<template>
  <navbarVue />
  <headerVue />
  <cardPackageVue />
  <CategoryToursVue />
  <footerVue />
</template>

<style></style>
