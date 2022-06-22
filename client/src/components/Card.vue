<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";

export default {
  name: "Card",
  props: ["products"],
  methods: {
    rupiahConverter(value) {
      const formatter = new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
      })
        .format(value)
        .replace(/[IDR]/gi, "")
        .trimStart();
      return `Rp ${formatter}`;
    },
  },
};
</script>

<template>
  <div class="col-4 mb-3">
    <div class="card p-3 rounded-3">
      <div class="row align-items-center" style="height: 125px">
        <div class="col-3">
          <img
            :src="products.imgUrl"
            alt="product-image"
            class="mx-auto d-block"
            style="width: 70px"
          />
        </div>
        <div class="col-9">
          <div style="margin-bottom: 5px">
            <h3 class="mb-0">
              <strong>{{ products.name }}</strong>
            </h3>
          </div>
          <div>
            <p class="mb-0" style="text-align: left">
              {{ products.description }}
            </p>
            <p class="mb-0" style="margin-top: 5px">
              <span class="badge rounded-pill bg-warning text-dark">{{
                rupiahConverter(products.price)
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
