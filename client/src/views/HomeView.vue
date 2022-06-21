<template>
  <div class="container">
    <div class="col-md-12 ms-lg-4 mt-1">
      <div class="row">
        <CardComponentVue v-for="dat in card" :key="dat.id" :player="dat" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductStore } from "../stores/product";
import CardComponentVue from "../components/CardComponent.vue";
export default {
  components: {
    CardComponentVue,
  },
  computed: {
    ...mapState(useProductStore, ["card"]),
  },
  methods: {
    ...mapActions(useProductStore, ["getProducts", "addToList"]),
  },
  created() {
    this.getProducts();
    // console.log(this.card);
  },
};
</script>
