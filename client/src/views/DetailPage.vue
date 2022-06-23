<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from "../stores/main"
import ColourPallette from '../components/ColourPallette.vue'
export default {
    created: function () {
        const { ProductId } = this.$route.params
        this.getOneProduct(ProductId)
        this.checkProduct()
    },
    methods: {
        ...mapActions(useMainStore, ["getOneProduct", "addingWishlist", 'addToCart', 'checkWishlist', 'getAllWishlists', 'deleteWishlist']),
        addWishlist: function () {
            const data = this.product
            this.addingWishlist(data)
                .then(() => {
                    let timerInterval
                    Swal.fire({
                        title: 'You successfully added new product to your wishlist! :)',
                        timer: 2000,
                        didOpen: () => {
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })
                    this.$router.push('/wishlist')

                })
                .catch((err) => {
                    console.log(err)
                })
        },
        changeImage: function () {
            this.product.image_link = "https://cdn-icons-png.flaticon.com/512/5856/5856842.png"
        },
        addCart: function () {
            const data = this.product
            this.addToCart(data)
                .then(() => {
                    let timerInterval
                    Swal.fire({
                        title: 'You successfully added new product to your cart! :)',
                        timer: 2000,
                        didOpen: () => {
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })
                    this.$router.push('/')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        checkProduct: async function () {
            await this.getAllWishlists()
            // console.log(this.wishlists)
            const { ProductId } = this.$route.params
            const check = this.wishlists.find((el) => el.productId == ProductId)
            if (check) {
                this.productExistsInWishlists = true
            }
        },
        removeWishlist: function () {
            const { ProductId } = this.$route.params
            this.deleteWishlist(ProductId)
                .then(() => {
                    Swal.fire({
                        title: 'The product has been deleted from your wishlists',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    this.$router.push('/')
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    },
    computed: {
        ...mapState(useMainStore, ["product", "convertPrice", 'wishlists', "useLoader"])
    },
    components: {
        ColourPallette
    },
    data() {
        return {
            productExistsInWishlists: false
        }
    }
}
</script>
<template>
    <div class="container mt-5">
        <div class="row row-product d-flex justify-content-center">
            <div v-if="useLoader" style="size: cover;">
                <img
                    src="https://media2.giphy.com/media/fBDHEIhKGNveDbdiHn/giphy.gif?cid=6c09b9522ud0wublok0ll1n6furz79rwqogqnknuaooyfdbw&rid=giphy.gif&ct=s"
                    style="width: 1000px;">
            </div>
            <div v-if="!useLoader" class="col-lg-5" style="size: cover;">
                <figure class="figure">
                    <img :src="product.image_link" class="figure-img img-fluid rounded" alt="..."
                        style="border-radius: 5px; max-width: 450px;max-height: 450px;min-height: 300px;min-width: 300px;"
                        v-on:error="changeImage" />
                    <figcaption class="figure-caption text-end">
                        <button class="btn btn-orange-100 d-inline-flex" @click="addWishlist"
                            v-if="!productExistsInWishlists">
                            <img src="http://cdn.onlinewebfonts.com/svg/img_316433.png" style="width: 50px" alt="" />
                        </button>
                        <button class="btn btn-orange-100 d-inline-flex" v-if="productExistsInWishlists"
                            @click="removeWishlist">
                            <img src="https://cdn11.bigcommerce.com/s-hii7479o/images/stencil/original/products/17276/38907/heart__96095.1628275738.png?c=2"
                                style="width: 50px" alt="" />
                        </button>
                        <button class="btn btn-orange-100 d-inline-flex" @click="addCart">
                            <img src="../assets/cart.png" style="width: 50px" alt="" />
                        </button>
                    </figcaption>
                </figure>
            </div>
            <div v-if="!useLoader"  class="col-lg-7">
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
                <h5>Price: Rp {{ convertPrice }}</h5>
                <hr>
            </div>
        </div>
    </div>
</template>