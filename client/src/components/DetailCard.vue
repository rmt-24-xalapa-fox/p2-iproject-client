<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";

export default {
    name: "DetailCard",
        data() {
        return {
            productId: +this.params
        }
  },
    props: ["products"],
    methods: {
        ...mapActions(useCounter, ['fetchOneProduct'])
    },
  computed: {
    ...mapState(useCounter, ["products"]),
  },
  created() {
        if (!this.products) {
        this.fetchOneProduct(this.productId)
    }
  }
}
</script>

<template>
  <div class="col-12 mb-3">
    <div class="card p-3 rounded-3">
      <div class="row align-items-center" style="height: auto">
        <div class="col-3">
          <img
            :src="products.imgUrl"
            alt="product-image"
            class="mx-auto d-block"
            style="width: 300px"
          />
        </div>
        <div class="col-3">
          <div style="margin-bottom: 5px">
            <h3 class="mb-0">
              <strong>{{ products.name}}</strong>
            </h3>
          </div>
          <div>
            <p class="mb-0" style="text-align: left">
              {{ products.description}}
            </p>
            <p class="mb-0" style="margin-top: 5px">
              <!-- <span class="badge rounded-pill bg-warning text-dark">{{
                rupiahConverter(products.price)
              }}</span> -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>