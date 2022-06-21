<script>
import Card from "../components/Card.vue";
export default {
  name: "ProductList",
  components: {
    Card,
  },
  props: ["theBooks", "theClass"],
};
</script>

<template>
  <div :class="theClass">
    <Card v-for="book in theBooks" :key="book.id" :book="book" />
  </div>
</template>

<style></style>
