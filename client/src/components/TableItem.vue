<script>
export default {
    props: ['product'],
    data(){
        return{
            quantity: 1,
            totalPrice: 0,
            priceConverted: ""
        }
    },
    methods:{
        pricing: function(){
            this.totalPrice = this.quantity * this.product.productPrice
        },
        convertPrice: function(){
            this.priceConverted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(this.totalPrice);
        },
        addQuantity: function(){
            this.quantity++
        },
        decreaseQuantity: function(){
            this.quantity = this.quantity - 1
        }
    },
    created: function(){
        this.pricing()
        this.convertPrice()
    }
}
</script>
<template>
    <tr style="line-height: 35px;">
        <td>
            <button class="btn btn-orange-100 d-inline-flex">
                <img src="https://icons-for-free.com/iconfiles/png/512/basket+remove-131983800272594389.png"
                    style="width: 30px;" alt="">
            </button>
        </td>
        <td>{{ product.productBrand }}</td>
        <td>{{ product.productName }}</td>
        <td>
            <button class="btn btn-orange-100 d-inline-flex" @click.prevent="decreaseQuantity"><img
                    src="https://cdn3.iconfinder.com/data/icons/user-interfaces-set-3/25/user-interfaces-set-3009-512.png"
                    style="width: 20px;" alt=""></button>
                {{ quantity }}
            <button class="btn btn-orange-100 d-inline-flex" @click.prevent="addQuantity"><img src="http://cdn.onlinewebfonts.com/svg/img_51677.png"
                    style="width: 20px;" alt=""></button>
        </td>
        <td>{{priceConverted}}</td>
    </tr>
</template>