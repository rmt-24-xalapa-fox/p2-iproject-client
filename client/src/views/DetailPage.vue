<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from "../stores/main"
import ColourPallette from '../components/ColourPallette.vue'
export default {
    created: function () {
        const { ProductId } = this.$route.params
        this.getOneProduct(ProductId)
    },
    methods: {
        ...mapActions(useMainStore, ["getOneProduct", "addingWishlist", 'addToCart']),
        addWishlist: function () {
            const data = this.product
            this.addingWishlist(data)
        },
        changeImage: function () {
            this.product.image_link = "https://cdn-icons-png.flaticon.com/512/5856/5856842.png"
        },
        addCart: function(){
            const data = this.product
            this.addToCart(data)
        }

    },
    computed: {
        ...mapState(useMainStore, ["product", "convertPrice"])
    },
    components: {
        ColourPallette
    },
}
</script>
<template>
    <div class="container mt-5">
        <div class="row row-product d-flex justify-content-center">
            <div class="col-lg-5" style="size: cover;">
                <figure class="figure">
                    <img :src="product.image_link" class="figure-img img-fluid rounded" alt="..."
                        style="border-radius: 5px; max-width: 450px;max-height: 450px;min-height: 300px;min-width: 300px;" v-on:error="changeImage" />
                    <figcaption class="figure-caption text-end">
                        <button class="btn btn-orange-100 d-inline-flex" @click.prevent="addWishlist">
                            <img src="http://cdn.onlinewebfonts.com/svg/img_316433.png" style="width: 50px" alt="" />
                        </button>
                        <button class="btn btn-orange-100 d-inline-flex" @click.prevent="addCart">
                            <img src="https://cdn.icon-icons.com/icons2/2645/PNG/512/cart_plus_icon_160300.png"
                                style="width: 50px" alt="" />
                        </button>
                    </figcaption>
                </figure>
            </div>
            <div class="col-lg-7">
                <h4>{{ product.name }}</h4>
                <small class="text-muted">{{ product.product_type }} {{ product.category }} by {{ product.brand
                }}</small>
                <hr>
                <p>
                    {{ product.description }}
                </p>
                <hr>
                <div class="colour_section">
                    <ColourPallette v-for="(color, i) in product.product_colors" :key="i" :color="color" />
                </div>
                <hr>
                <div>
                    <span v-for="(tag, i) in product.tag_list" :key="i" class="badge rounded-pill bg-warning text-dark"
                        style="margin:4px">{{ tag }}</span>
                </div>
                <hr>
                <h5>Price: Rp {{ product.price }}</h5>
                <hr>
            </div>
        </div>
    </div>
</template>