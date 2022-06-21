<script>
import Card from "../components/Card.vue";
export default {
  name: "ProductList",
  components: {
    Card,
  },
  props: ["theProducts", "theClass"],
};
</script>

<template>
  <div :class="theClass">
    <Card v-for="product in theProducts" :key="product.id" :product="product" />
  </div>
</template>

<style></style>
