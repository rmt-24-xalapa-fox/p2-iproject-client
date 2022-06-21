<script>
import { mapState, mapActions } from "pinia"
import { useCounter } from "../stores/store"
import Card from "../components/Card.vue"

export default {
  name: "Products",
  components: {
    Card
  },
  methods: {
    ...mapActions(useCounter, ["fetchProducts"])
  },
  created() {
    this.fetchProducts()
  },
  computed: {
    ...mapState(useCounter, ["products"])
  }
};
</script>

<template>
  <div id="products-list">
    <div class="container" style="margin-top:15px"> 
        <Card v-for="product in products" :key="product.id" :products="product"/>
    </div>
  </div>
</template>

<style scoped>
#products-list {
  background-color: #023047;
  width: 100vw;
  height: 100vh;
}
</style>
