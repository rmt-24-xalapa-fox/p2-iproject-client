<template>
    <div class="row" style="margin-bottom: 10px; margin-top: 100px;">
        <div class="col-md-3 col-sm-6" v-for="product in products" :key="product.id">
            <div class="product-grid" style="margin-bottom: 5px">
                <div class="product-image">
                    <a href="#" class="image">
                        <img :src="product.images_list[0]" style="height: 250px">
                    </a>
                    <ul class="product-links">
                        <li><a href="#"><i class="fa fa-shopping-cart" @click.prevent="btnFav(product.id)"></i></a></li>
                        <!-- <li><a href="#"><i class="fa fa-heart"></i></a></li>
                        <li><a href="#"><i class="fa fa-random"></i></a></li> -->
                    </ul>
                    <a href="" class="add-to-cart" @click.prevent="btnFav(product.id)">Add to Cart</a>
                </div>
                <div class="product-content">
                    <h3 class="title"><a href="#">{{ product.title }}</a></h3>
                    <div class="price">Rp. {{
                            Number(product.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })
                    }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from "../stores";
    export default {
        props: ['products'],
        methods: {
            ...mapActions(useIndexStore, ["addCart", "readCart"]),

            btnFav(id) {
                this.addCart(id)
                    .then(() => { 
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: `Success add product to cart!`,
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `Failed add product to cart!!`,
                        });
                    })
            },

            
        },
        created(){
            this.readCart()
        }
        
    }
</script>

<style scoped>

.product-grid {
    text-align: center;
    height: 450px
}

.product-grid .product-image {
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.product-grid .product-image a.image {
    display: block;
}

.product-grid .product-image img {
    width: 100%;
    height: auto;
}

.product-grid .product-links {
    padding: 0;
    margin: 0;
    list-style: none;
    position: absolute;
    top: 10px;
    right: -50px;
    transition: all .5s ease 0s;
}

.product-grid:hover .product-links {
    right: 10px;
}

.product-grid .product-links li a {
    color: #333;
    background: transparent;
    font-size: 17px;
    line-height: 38px;
    width: 38px;
    height: 38px;
    border: 1px solid #333;
    border-bottom: none;
    display: block;
    transition: all 0.3s;
}

.product-grid .product-links li:last-child a {
    border-bottom: 1px solid #333;
}

.product-grid .product-links li a:hover {
    color: #fff;
    background: #333;
}

.product-grid .add-to-cart {
    background: #0f6cb2;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    width: 100%;
    padding: 10px 26px;
    position: absolute;
    left: 0;
    bottom: -60px;
    transition: all 0.3s ease 0s;
}

.product-grid:hover .add-to-cart {
    bottom: 0;
}

.product-grid .add-to-cart:hover {
    text-shadow: 4px 4px rgba(0, 0, 0, 0.2);
}

.product-grid .product-content {
    background: #fff;
    padding: 15px;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1) inset;
}

.product-grid .title {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    margin: 0 0 7px;
}

.product-grid .title a {
    color: #777;
    transition: all 0.3s ease 0s;
}

.product-grid .title a:hover {
    color: #0f6cb2;
}

.product-grid .price {
    color: #0d0d0d;
    font-size: 14px;
    font-weight: 600;
}

.product-grid .price span {
    color: #888;
    font-size: 13px;
    font-weight: 400;
    text-decoration: line-through;
}

@media screen and (max-width: 990px) {
    .product-grid {
        margin-bottom: 30px;
    }
}
</style>