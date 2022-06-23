<script>
export default {
    props: ['wishlist'],
    methods:{
        convertPrice: function () {
            this.price = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(this.wishlist.productPrice);
        },
    },
    data(){
        return{
            price: 0
        }
    },
    created: function () {
        this.convertPrice()
    },
}
</script>
<template>
    <div class="col">
        <div class="card h-100 card-product text-center">
            <img :src="wishlist.productImage" class="card-img-top rounded-circle" style="max-width: 250px;max-height:250px;margin-left: 50px;" alt="..." />
            <div class="card-body">
                <h6 class="card-title" style="font-family: 'Righteous', cursive;">{{wishlist.productName}}</h6>
                    <h6 class="card-title"><small class="text-muted">{{ wishlist.productBrand }}</small></h6>
                <p class="card-text"  style="font-family: 'Changa', sans-serif;">{{price}}</p>
            </div>
        </div>
    </div>
</template>