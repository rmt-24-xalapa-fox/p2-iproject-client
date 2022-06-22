<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores/main";
import TableItem from "./TableItem.vue";
export default {
    created: function () {
        this.getCart()
    },
    methods: {
        ...mapActions(useMainStore, ['getProductsInCart']),
        getCart: function () {
            this.getProductsInCart()
        }
    },
    computed: {
        ...mapState(useMainStore, ['cartProducts'])
    },
    components: {
        TableItem
    }
}
</script>
<template>
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Your Cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col-2"></th>
                                        <th scope="col-2">Brand</th>
                                        <th scope="col-4">Product</th>
                                        <th scope="col-3">Quantity</th>
                                        <th scope="col-2">Sub Total Price</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle">
                                    <TableItem v-for="(product, i) in cartProducts" :key="i" :product="product" />

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Checkout</button>
            </div>
        </div>
    </div>
</template>