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
        }
    }
};
</script>
<template>
    <div class="col-2" style="display: grid;
  justify-content: center;">
        <router-link :to="{ name: 'detail', params: { id: data.id } }">
            <div class="card h-100" style="width:100%;">
                <img :src="data.imgUrl" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title" style="font-size:14px">{{ data.name }}</h5>
                    <p class="card-text" style="font-size:12px">{{ data.description }}</p>
                    <p class="card-text" style="color:gray">{{ formatCurrency(data.price) }}</p>

                </div>
            </div>
        </router-link>
    </div>
</template>
