<template>
    <!-- ============================================== SCROLL TABS ============================================== -->
    <div class="scroll-tabs outer-top-vs">
        <div class="more-info-tab clearfix ">
            <h3 class="new-product-title pull-left">New Products</h3>
            <!-- /.nav-tabs -->
        </div>



        <div class="tab-content outer-top-xs">
            <!-- <div class="tab-pane in active" id="all"> -->
            <!-- <div class="product-slider"> -->
            <!-- <div class="owl-carousel home-owl-carousel custom-carousel owl-theme"> -->
            <!-- <div class="item item-carousel"> -->
            <div class="products card " v-for="product in products" key="product.id" style="width: 18rem;">
                <div class="product card-body">
                    <div class="product-image card-img-top">
                        <div class="image">
                            <a href="#">
                                <img :src="product.image" alt="">
                                <!-- <img src="../assets/images/products/p1_hover.jpg" alt=""
                                                    class="hover-image"> -->
                            </a>
                        </div>
                        <!-- /.image -->

                        <div class="tag new"><span>new</span></div>
                    </div>
                    <!-- /.product-image -->

                    <div class="product-info text-left">
                        <h3 class="name"><a href="#">{{product.title}}</a></h3>
                        <div class="rating rateit-small"></div>
                        <div class="description"></div>
                        <div class="product-price"> <span class="price">{{product.price}}</span></div>
                        <!-- /.product-price -->

                    </div>
                    <!-- /.product-info -->
                    <div class="cart clearfix animate-effect">
                        <div class="action">
                            <ul class="list-unstyled">
                                <li class="add-cart-button btn-group">
                                    <button data-toggle="tooltip" class="btn btn-primary icon" type="button"
                                        title="Add Cart"> <i class="fa fa-shopping-cart"></i> </button>
                                    <button class="btn btn-primary cart-btn" type="button">Add to
                                        cart</button>
                                </li>
                                <li class="lnk wishlist"> <a data-toggle="tooltip" class="add-to-cart"
                                        href="detail.html" title="Wishlist"> <i class="icon fa fa-heart"></i> </a> </li>
                                <li class="lnk"> <a data-toggle="tooltip" class="add-to-cart" href="detail.html"
                                        title="Compare"> <i class="fa fa-signal" aria-hidden="true"></i> </a> </li>
                            </ul>
                        </div>
                        <!-- /.action -->
                    </div>
                    <!-- /.cart -->
                </div>
                <!-- /.product -->
            </div>
            <!-- /.products -->
            <!-- </div> -->
            <!-- /.item -->
            <!-- </div> -->
            <!-- /.home-owl-carousel -->
            <!-- </div> -->
            <!-- /.product-slider -->
            <!-- </div> -->
            <!-- /.tab-pane -->

        </div>
        <!-- /.tab-content -->
    </div>
    <!-- /.scroll-tabs -->
    <!-- ============================================== SCROLL TABS : END ============================================== -->
</template>

<script>
// import { mapActions, mapState, mapWritableState } from 'pinia'
// import { useIndexStore } from '../stores'
    export default {
        props: ['products'],
    }
</script>

<style scoped>

</style>