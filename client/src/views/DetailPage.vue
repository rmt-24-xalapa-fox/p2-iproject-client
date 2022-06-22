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
        ...mapActions(useMainStore, ["getOneProduct"]),
        addWishlist: function(){
            
        },
        changeImage: function(){
            this.product.image_link = "https://cdn-icons-png.flaticon.com/512/5856/5856842.png"
        }

    },
    computed: {
        ...mapState(useMainStore, ["product", "convertPrice"])
    },
    components: {
        ColourPallette
    }
}
</script>
<template>
    <div class="container mt-5">
        <div class="row row-product">
            <div class="col-lg-5">
                <figure class="figure">
                    <img :src="product.image_link" class="figure-img img-fluid rounded" alt="..."
                        style="border-radius: 5px; width: 450px" v-on:error="changeImage" />
                    <figcaption class="figure-caption text-end">
                        <button class="btn btn-orange-100 d-inline-flex">
                            <img src="http://cdn.onlinewebfonts.com/svg/img_316433.png" style="width: 50px" alt="" />
                        </button>
                        <button class="btn btn-orange-100 d-inline-flex">
                            <img src="https://cdn.icon-icons.com/icons2/2645/PNG/512/cart_plus_icon_160300.png"
                                style="width: 50px" alt="" />
                        </button>
                    </figcaption>
                </figure>
            </div>
            <div class="col-lg-7">
                <h4>{{ product.name }}</h4>
                <small class="text-muted">{{ product.product_type }} {{ product.category }} By {{ product.brand
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
                <h5>Price: {{ convertPrice }}</h5>
                <hr>
                <div class="container-wrapper">
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="row justify-content-center">
                            <!-- star rating -->
                            <div class="rating-wrapper">
                                <i v-for="i in product.rating" class="fa-solid fa-star"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>