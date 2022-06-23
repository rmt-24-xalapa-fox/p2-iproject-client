<script>
import { mapActions, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default {
    name: "Card",
    props: ['data'],
    data() {
        return {
        };
    },
    computed: {
        ...mapWritableState(useCounterStore, ['isLogin'])
    },
    methods: {
        ...mapActions(useCounterStore, ['buyHandler', 'detailHandler']),
        formatCurrency(num) {
            return num?.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        },
        // changePageToDetail() {
        //     this.$router.push({
        //         name: "detail",
        //         params: { id }
        //     });
        // }
    }
};
</script>
<template>
    <div class="col-2">
        <router-link :to="{ name: 'detail', params: { id: data.id } }">
            <div class="card" style="width:100%;">
                <img :src="data.imgUrl" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title" style="font-size:14px">{{ data.name }}</h5>
                    <p class="card-text" style="font-size:12px">{{ data.description }}</p>
                    <p class="card-text" style="color:gray">{{ formatCurrency(data.price) }}</p>

                    <!-- <a href="#" class="btn btn-primary" v-if="isLogin"
                    @click.prevent="buyHandler(data.id, data.name)">Buy</a> -->
                </div>
            </div>
        </router-link>
    </div>
</template>
