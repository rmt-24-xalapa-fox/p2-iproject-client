<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";

export default {
    name: "Form",
    data() {
        return {
            newSales: {
                ProductId: 0,
                qty: 0
            }
        }
    },
    props: ["products"],
    methods: {
       ...mapActions(useCounter, ["addSales"])
    }
}
</script>

<template>
    <div>
        <form class="col-10" @submit.prevent="addSales(newSales)">
            <div class="form-group row">
                <label for="ProductId" class="col-2 col-form-label" style="color: white;">Product Name</label> 
                <div class="col-3">
                <select id="ProductId" name="ProductId" class="custom-select" required="required" v-model="newSales.ProductId">
                    <option v-for="product in products" :key="product.id" :value="product.id">{{product.name}}</option>
                </select>
                </div>
            </div>
            <div class="form-group row">
            <label for="qty" class="col-2 col-form-label" style="color: white;">Quantity</label> 
            <div class="col-3">
            <div class="input-group">
                <div class="input-group-prepend">
                <div class="input-group-text">
                    <i class="fa fa-sort-numeric-asc"></i>
                </div>
                </div> 
                <input id="qty" name="qty" type="text" required="required" class="form-control" v-model="newSales.qty"> 
                <div class="input-group-append">
                </div>
            </div>
        </div>
    </div> 
    <div class="form-group row">
        <div class=" col-7">
        <button name="submit" type="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>
    </form>
    </div>
</template>