<script>
import Buttons from "../components/Buttons.vue";
import Table from "../components/Table.vue"
export default {
  name: "Ingredients",
  components: {
    Buttons,
    Table
  },
};
</script>

<template>
  <div id="page">
    <div class="container-fluid col-10 justify-content-between" id="buttons">
      <Buttons button-name="Add New Ingredient" @click="formDisplay" />
    </div>
    <div class="container-fluid col-10 form-popup" id="form">
      <!-- <Form :products="products"/> -->
    </div>
    <div
      class="container-fluid col-10 align-items-center justify-content-between"
    >
      <Table />
    </div>
  </div>
</template>

<style scoped>
#page {
  background-color: #023047;
  width: auto;
  height: auto;
  padding-top: 50px;
  padding-bottom: 150px;
}
#buttons {
  margin-top: 50px;
  margin-bottom: 10px;
}

.form-popup {
  display: none;
}
</style>
