<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";
import Card from "../components/Card.vue";
import Buttons from "../components/Buttons.vue";
import ProductForm from "../components/ProductForm.vue";

export default {
  name: "Products",
  components: {
    Card,
    Buttons,
    ProductForm,
  },
  methods: {
    ...mapActions(useCounter, [
      "fetchProducts",
      "fetchAllCategories",
      "formDisplay",
    ]),
  },
  created() {
    this.fetchProducts();
    this.fetchAllCategories();
  },
  computed: {
    ...mapState(useCounter, ["products", "categories"]),
  },
};
</script>

<template>
  <div id="products-list">
    <br />
    <div id="buttons" class="container-fluid col-12">
      <Buttons button-name="Add New Product" @click="formDisplay" />
    </div>
    <div>
      <ProductForm
        class="container-fluid col-12 form-popup"
        id="form"
        :categories="categories"
      />
    </div>
    <div class="container-fluid row">
      <Card v-for="product in products" :key="product.id" :products="product" />
    </div>
  </div>
</template>

<style scoped>
#products-list {
  background-color: #023047;
  width: 100vw;
  height: auto;
}

#buttons {
  margin-top: 50px;
}

.form-popup {
  display: none;
}
</style>
