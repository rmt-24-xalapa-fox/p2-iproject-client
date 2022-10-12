<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default {
    name: "CartCard",
    props: ['data'],
    data() {
        return {
        };
    },
    computed: {

    },
    methods: {
        formatCurrency(num) {
            return num?.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        },
        ...mapActions(useCounterStore, ['deleteHandler', 'buyHandler'])

    }
};
</script>
<template>
    <div class="col-2">

        <!-- <router-link :to="{ name: 'detail', params: { id: data.id } }"> -->
        <div class="card" style="width:100%;">
            <img :src="data.imgUrl" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" style="font-size:14px">{{ data.name }}</h5>
                <p class="card-text" style="font-size:12px">Qty: {{ data.qty }} </p>
                <p class="card-text" style="color:gray">{{ formatCurrency(data.paidPrice) }}</p>
            </div>
            <button class="btn btn-primary" type="button"
                @click.prevent="buyHandler(data.ProductId, data.name, data.qty, data.id)">Pay
                Now</button>
            <button class="btn btn-danger" type="button" @click.prevent="deleteHandler(data.id)">Delete</button>
        </div>
        <!-- </router-link> -->
    </div>
</template>
