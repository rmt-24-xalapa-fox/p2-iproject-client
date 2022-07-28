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
  justify-content: center; margin-top: 10px; margin-bottom: 5px; transition: transform .2s;">
        <router-link :to="{ name: 'detail', params: { id: data.id } }">
            <div class="card h-100" style="width: 170px; height: 300px;">
                <img :src="data.imgUrl" class="card-img-top" alt="...">
                <div class="card-body"
                    style="display:flex; flex-direction: column; justify-content: space-between; text-decoration: none;">
                    <h5 class="card-title" style="font-size:14px">{{ data.name }}</h5>
                    <p class="card-text" style="font-size:12px; color: gray;">{{
                            data.description
                    }}</p>
                    <p class="card-text" style="color:black; text-decoration: none;">{{ formatCurrency(data.price) }}
                    </p>

                </div>
            </div>
        </router-link>
    </div>
</template>
<style>
.col-2:hover {
    background-color: yellowgreen;
    transform: scale(1.06);
}
</style>
