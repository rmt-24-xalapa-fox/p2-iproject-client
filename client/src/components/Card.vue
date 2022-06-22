<script>
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '../stores/main'
export default {
    props: ["product"],
    computed: {
        ...mapState(useMainStore, ["hasLoggedIn"])
    },
    methods: {
        goToDetailPage: function () {
            // this.$router.push(`/detail/${this.el.id}`)
        },
        convertPrice: function () {
            if (this.product.price == 0.0) {
                this.product.price = 3
            }
            this.price = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(this.product.price * 15000);
        },
        goToDetailPage: function () {
            this.$router.push(`/detail/${this.product.id}`)
        }
    },
    created: function () {
        this.convertPrice()
    },
    data() {
        return {
            price: 0
        }
    }
}
</script>
<template>
    <div class="col">
        <div type="button" @click.prevent="goToDetailPage">
            <div class="card h-100 card-product text-center">
                <img :src="product.image_link" class="card-img-top rounded-circle" :alt="product.name" style="max-width: 250px;max-height:250px;"/>
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <h6 class="card-title"><small class="text-muted">{{ product.brand }}</small></h6>

                    <p class="card-text">{{ price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>