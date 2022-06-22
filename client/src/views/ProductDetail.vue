<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";
import DetailCard from "../components/DetailCard.vue"

export default {
  name: "ProductDetail",
    data() {
        return {
            productId: this.parameter
        }
  },
  components: {
    DetailCard
  },
  methods: {
    ...mapActions(useCounter, ["fetchOneProduct", "clickDetail"]),
  },
    computed: {
      ...mapState(useCounter, ["products", "parameter"]),
    },
  created() {    
    this.fetchOneProduct(this.productId)
  },
};
</script>

<template>
  <div id="products-list">
    <div class="container row">
        <DetailCard :products="products"/>
    </div>
  </div>
</template>

<style scoped>
#products-list {
  background-color: #023047;
  width: 100vw;
  height: 100vh;
}

.container {
  margin: 50px 5%;
  padding: 30px 0px;
  display: inline-flex;
}
</style>
