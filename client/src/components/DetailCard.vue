<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";
import EditProduct from "../components/EditProductForm.vue"

export default {
    name: "DetailCard",
    components: {
        EditProduct
    },
    data() {
        return {
            productId: this.parameter
        }
  },
    props: ["products"],
    methods: {
        ...mapActions(useCounter, ['fetchOneProduct']),
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
  computed: {
    ...mapState(useCounter, ["categories"]),
  },
  created() {
        if (!this.products) {
        this.fetchOneProduct(this.productId)
    }
  }
}
</script>

<template>
    <div class="col-6 mb-3" style="max-width:auto">
        <div class="card p-3 rounded-3">
        <div class="row " style="max-height: 300px; ">
            <div class="col-4" style="margin-right:50px;">
            <img
                :src="products.imgUrl"
                alt="product-image"
                class="mx-auto d-block"
                style="max-width: 200px"
            />
            </div>
            <div class="col-6 bg-light">
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
                <span class="badge rounded-pill bg-warning text-dark">{{
                    rupiahConverter(products.price)
                }}</span>
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="col-6 mb-3" >
        <EditProduct style="margin-top:45px" :products="products" :categories="categories"/>
    </div>
</template>