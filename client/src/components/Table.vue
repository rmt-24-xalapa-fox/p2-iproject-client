<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";
export default {
    name: "Table",
    computed: {
        ...mapState(useCounter, ['sales'])
    },
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
}
</script>

<template>
    <div id="table">
        <div class="card">
        <table class="table data-sticky-header">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Unit Sold</th>
                <th scope="col">Sales</th>
                <th scope="col">Expense</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sale in sales" :key="sale.id">
                <th>{{sale.Product.name}}</th>
                <td>{{sale.quantity}}</td>
                <td>{{rupiahConverter(sale.sales)}}</td>
                <td>{{rupiahConverter(sale.cost)}}</td>
                <td>{{sale.createdAt}}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<style>

.card {
    margin-top: 50px;
}

.thead-dark{
    overflow-y: hidden
}
</style>
