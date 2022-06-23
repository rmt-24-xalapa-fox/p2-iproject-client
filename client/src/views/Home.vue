<script>
import Card from "../components/Card.vue";
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores/main";
export default {
    components: {
        Card
    },
    methods: {
        ...mapActions(useMainStore, ["getAllProducts"]),
        getProductsByNextPage: function () {
            this.page = +this.currentPage + 1
            let query = {}
            query.page = this.page
            if (this.product_type) {
                query.type = this.product_type
            }
            if (this.product_tag) {
                query.tag = this.product_tag
            }
            if (this.brand) {
                query.tag = this.brand
            }
            this.$router.push({
                name: "Home",
                query
            })
            this.getAllProducts(query)
        },
        getProductsByPreviousPage: function () {
            this.page = +this.currentPage - 1
            let query = {}
            query.page = this.page
            if (this.product_type) {
                query.type = this.product_type
            }
            if (this.product_tag) {
                query.tag = this.product_tag
            }
            if (this.brand) {
                query.tag = this.brand
            }
            this.$router.push({
                name: "Home",
                query
            })
            this.getAllProducts(query)
        },
        getProductByType: function () {
            const type = this.product_type
            let query = {}
            query.type = type
            if (this.page) {
                query.page = this.page
            }

            if (this.product_tag) {
                query.tag = this.product_tag
            }
            if (this.brand) {
                query.brand = this.brand
            }
            this.$router.push({
                name: "Home",
                query
            })
            this.getAllProducts(query)
        },
        getProductByTag: function () {
            const tag = this.product_tag
            let query = {}
            query.tag = tag
            if (this.page) {
                query.page = this.page
            }
            if (this.product_type) {
                query.type = this.product_type
            }
            if (this.brand) {
                query.brand = this.brand
            }
            this.$router.push({
                name: "Home",
                query
            })
            this.getAllProducts(query)
        },
        getProductByBrand: function () {
            const brand = this.brand
            let query = {}
            query.brand = brand
            if (this.page) {
                query.page = this.page
            }
            if (this.product_tag) {
                query.tag = this.product_tag
            }
            if (this.product_type) {
                query.type = this.product_type
            }
            this.$router.push({
                name: "Home",
                query
            })
            this.getAllProducts(query)
        }
    },
    created: function () {
        this.page = this.$route.query.page
        this.brand = this.$route.query.brand
        this.product_tag = this.$route.query.tag
        this.product_type = this.$route.query.type
        const { query } = this.$route

        this.getAllProducts(query)
    },
    data() {
        return {
            brand: null,
            product_tag: null,
            product_type: null,
            page: null,
        }
    },
    computed: {
        ...mapState(useMainStore, ["products", "totalPages", "currentPage", "useLoader"])
    },
    watch: {
        product_type(newValue) {
            if (newValue) {
                this.getProductByType()
            }
        },
        product_tag(newValue) {
            if (newValue) {
                this.getProductByTag()
            }
        },
    }
}
</script>
<template>
    <div class="container">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner rounded-3" style="size: cover; height: 300px">
                <div class="carousel-item active">
                    <img class="d-block w-100" src="../assets/lipstick.jpg" alt="First slide" style="opacity: 80%" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="../assets/blush.jpg" alt="Second slide" style="opacity: 80%" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="../assets/eyepalette.jpg" alt="Third slide" style="opacity: 80%" />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>

    <div class="container mt-5">
        <div class="row text-center" style="background-color: rgba(253, 242, 231, 0.84); margin: 0px">
            <!-- menu-kategori -->

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="mascara" value="mascara"
                        v-model="product_type">
                    <label for="mascara" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://cdn-icons-png.flaticon.com/512/2025/2025268.png" alt="" style="width: 50px"
                            class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Mascara
                        </p>
                    </label>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="lipstick" value="lipstick"
                        v-model="product_type">
                    <label for="lipstick" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://usefulicons.com/uploads/icons/201906/1368/86f8062663d6.png" alt=""
                            style="width: 50px" class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Lipstick
                        </p>
                    </label>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="foundation" value="foundation"
                        v-model="product_type">
                    <label for="foundation" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://zelcos.com/wp-content/uploads/2020/10/makeup-remover-300x300.png" alt=""
                            style="width: 50px" class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Foundation
                        </p>
                    </label>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="eyeliner" value="eyeliner"
                        v-model="product_type">
                    <label for="eyeliner" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://cdn-icons-png.flaticon.com/512/3461/3461610.png" alt="" style="width: 50px"
                            class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Eyeliner
                        </p>
                    </label>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="eyebrow" value="eyebrow"
                        v-model="product_type">
                    <label for="eyebrow" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://cdn-icons-png.flaticon.com/512/3790/3790363.png" alt="" style="width: 50px"
                            class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Eyebrow
                        </p>
                    </label>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="blush" value="blush"
                        v-model="product_type">
                    <label for="blush" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://cdn-icons-png.flaticon.com/512/1254/1254609.png" alt="" style="width: 50px"
                            class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Blush
                        </p>
                    </label>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="bronzer" value="bronzer"
                        v-model="product_type">
                    <label for="bronzer" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://static.thenounproject.com/png/923899-200.png" alt="" style="width: 50px"
                            class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Bronzer
                        </p>
                    </label>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-sm-4 col-6"
                style="margin-left: 20px; margin-right: 25px; padding-top: 10px">
                <div>
                    <input type="radio" class="btn-check" name="product_type" id="eyeshadow" value="eyeshadow"
                        v-model="product_type">
                    <label for="eyeshadow" class="btn btn-light" style="background-color:transparent;border:none">
                        <img src="https://cdn-icons-png.flaticon.com/512/1150/1150853.png?w=360" alt=""
                            style="width: 50px" class="img-category" />
                        <p class="mt-2" style="font-size: 12px; font-family: 'Mali', cursive">
                            Eyeshadow
                        </p>
                    </label>
                </div>
            </div>
        </div>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-3">
                <div class="card mb-4 fieldsearch">
                    <div class="card-body ">
                        <form @submit.prevent="getProductByBrand">
                            <div class="input-group">
                                <input type="text" name="search" class="form-control search-input d-inline-flex"
                                    placeholder="Search By Brands" v-model="brand" style="background-color: rgba(208, 226, 245, 0.1);">
                                <button type="submit" class="btn btn-search rounded">
                                    <img src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4092559-magnifier-mobile-ui-search-ui-website-zoom_114034.png"
                                        alt="" style="width: 20px;">
                                </button>
                            </div>
                        </form>
                        <div class="mt-3">
                            <button class="btn btn-light d-block filter" type="button" data-bs-toggle="collapse"
                                data-bs-target="#multiCollapseExample1" aria-expanded="false"
                                aria-controls="multiCollapseExample1" style="width: 100%;">
                                Filter By Product Tags
                            </button>
                            <div class="collapse multi-collapse mt-3 list-group list-group-flush"
                                id="multiCollapseExample1" style="background-color: tra;">
                                <li class="list-group-item">
                                    <input type="radio" class="btn-check" name="product_tags" id="Hypoallergenic"
                                        value="Hypoallergenic" v-model="product_tag">
                                    <label for="Hypoallergenic" class="btn btn-light"
                                        style="width:fit-content;font-size: 12px;background-color: transparent;border: none;">
                                        <img src="../assets/Plus-Sign.png" alt="" style="width: 10px;margin-right:10px">
                                        Hypoallergenic
                                    </label>
                                </li>
                                <li class="list-group-item">
                                    <input type="radio" class="btn-check" name="product_tags" id="No Talc"
                                        value="No+Talc" v-model="product_tag">
                                    <label for="No Talc" class="btn btn-light"
                                        style="width:fit-content;font-size: 12px;background-color: transparent;border: none;">
                                        <img src="../assets/Plus-Sign.png" alt="" style="width: 10px;margin-right:10px">
                                        No Talc
                                        </label>
                                </li>
                                <li class="list-group-item">
                                    <input type="radio" class="btn-check" name="product_tags" id="alcohol free"
                                        value="alcohol+free" v-model="product_tag">
                                    <label for="alcohol free" class="btn btn-light"
                                        style="width:fit-content;font-size: 12px;background-color: transparent;border: none;">
                                        <img src="../assets/Plus-Sign.png" alt="" style="width: 10px;margin-right:10px">
                                        Alcohol Free
                                        </label>
                                </li>
                                <li class="list-group-item">
                                    <input type="radio" class="btn-check" name="product_tags" id="cruelty free"
                                        value="cruelty+free" v-model="product_tag">
                                    <label for="cruelty free" class="btn btn-light"
                                        style="width:fit-content;font-size: 12px;background-color: transparent;border: none;">
                                        <img src="../assets/Plus-Sign.png" alt="" style="width: 10px;margin-right:10px">
                                        Cruelty Free
                                        </label>
                                </li>
                                <li class="list-group-item">
                                    <input type="radio" class="btn-check" name="product_tags" id="oil free"
                                        value="oil+free" v-model="product_tag">
                                    <label for="oil free" class="btn btn-light"
                                        style="width:fit-content;font-size: 12px;background-color: transparent;border: none;">
                                        <img src="../assets/Plus-Sign.png" alt="" style="width: 10px;margin-right:10px">
                                        Oil Free</label>
                                </li>
                                <li class="list-group-item">
                                    <input type="radio" class="btn-check" name="product_tags" id="silicone free"
                                        value="silicone+free" v-model="product_tag">
                                    <label for="silicone free" class="btn btn-light"
                                        style="width:fit-content;font-size: 12px;background-color: transparent;border: none;">
                                        <img src="../assets/Plus-Sign.png" alt="" style="width: 10px;margin-right:10px">
                                        Silicone
                                        Free</label>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <!-- <Spinner v-if="useLoader" /> -->
                    <div v-if="useLoader" style="size: cover;">
                        <img src="https://media2.giphy.com/media/fBDHEIhKGNveDbdiHn/giphy.gif?cid=6c09b9522ud0wublok0ll1n6furz79rwqogqnknuaooyfdbw&rid=giphy.gif&ct=s"
                            style="width: 750px;max-height:300px">
                    </div>
                    <Card v-if="!useLoader" v-for="product in products" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </div>


    <div style="padding-top: 100px;">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled" v-if="currentPage === 1">
                    <button class="page-link" style="background-color:transparent">
                        <img src="https://www.shareicon.net/data/512x512/2015/12/06/683145_multimedia_512x512.png"
                            alt="" style="width:20px">
                    </button>
                </li>
                <li class="page-item" v-if="currentPage !== 1">
                    <button class="page-link" style="background-color:transparent"
                        @click.prevent="getProductsByPreviousPage">
                        <img src="https://www.shareicon.net/data/512x512/2015/12/06/683145_multimedia_512x512.png"
                            alt="" style="width:20px">

                    </button>
                </li>
                <li class="page-item"><a class="page-link" style="background-color:transparent" href="#">{{ currentPage
                }}</a></li>
                <li class="page-item" v-if="currentPage !== totalPages">
                    <button class="page-link" href="#" @click.prevent="getProductsByNextPage"
                        style="background-color:transparent">
                        <img src="https://cdn-icons-png.flaticon.com/512/54/54325.png" alt="" style="width:20px">
                    </button>
                </li>
                <li class="page-item disabled" v-if="currentPage === totalPages">
                    <button class="page-link" href="#" style="background-color:transparent">
                        <img src="https://cdn-icons-png.flaticon.com/512/54/54325.png" alt="" style="width:20px">

                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>
<style>
.filter {
    font-size: large;
    font-family: 'Nanum Myeongjo', serif;
    background-color: rgba(63, 191, 191, 0.1);
}
.fieldsearch {
    background-color: rgba(245, 208, 226, 0.3);
    border: none;
}
</style>