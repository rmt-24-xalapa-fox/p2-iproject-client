<script>
import Card from "../components/Card.vue";
export default {
  name: "ProductList",
  components: {
    Card,
  },
  props: ["theBooks", "theClass", "inOrderPage"],
};
</script>

<template>
  <div :class="theClass">
    <Card
      v-for="book in theBooks"
      :key="book.id"
      :book="book"
      :inOrderPage="true"
    />
  </div>
</template>

<style></style>
