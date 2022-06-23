<template>
  <div class="body-content outer-top-vs ml-4" id="top-banner-and-menu">
    <div class="container">
      <div class="row">
        <!-- <Sidebar /> -->
        <!--==============================================CONTENT==============================================-->
        <div class="col-xs-12 col-sm-12 col-md-12 homebanner-holder">
          <!-- ========================================== SECTION – HERO ========================================= -->

          <div id="hero">
            <div id="owl-main" class="owl-carousel owl-inner-nav owl-ui-sm mb-4" style="margin-bottom: 100px;">
              <div class="item"
                style="background-image: url(https://res.cloudinary.com/dzosnc60i/image/upload/v1655815975/abeille/01_khtci1.jpg);">
                <div class="container-fluid">
                  <div class="caption bg-color vertical-center text-left">
                    <div class="slider-header fadeInDown-1">Top Brands</div>
                    <div class="big-text fadeInDown-1"> New Collections </div>
                    <div class="excerpt fadeInDown-2 hidden-xs"> <span>Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit.</span> </div>
                    <div class="button-holder fadeInDown-3"> <a href="index6c11.html?page=single-product"
                        class="btn-lg btn btn-uppercase btn-primary shop-now-button">Shop Now</a> </div>
                  </div>
                  <!-- /.caption -->
                </div>
                <!-- /.container-fluid -->
              </div>
              <!-- /.item -->

              <div class="item"
                style="background-image: url(https://res.cloudinary.com/dzosnc60i/image/upload/v1655815977/abeille/02_zbibsf.jpg);">
                <div class="container-fluid">
                  <div class="caption bg-color vertical-center text-left">
                    <div class="slider-header fadeInDown-1">Spring 2018</div>
                    <div class="big-text fadeInDown-1"> Women Fashion </div>
                    <div class="excerpt fadeInDown-2 hidden-xs"> <span>Nemo enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut fugit</span> </div>
                    <div class="button-holder fadeInDown-3"> <a href="index6c11.html?page=single-product"
                        class="btn-lg btn btn-uppercase btn-primary shop-now-button">Shop Now</a> </div>
                  </div>
                  <!-- /.caption -->
                </div>
                <!-- /.container-fluid -->
              </div>
              <!-- /.item -->

            </div>
            <!-- /.owl-carousel -->
          </div>

          <!-- ========================================= SECTION – HERO : END ========================================= -->


          <!-- ============================================== WIDE PRODUCTS ============================================== -->
          <div class="wide-banners outer-bottom-xs">
            <div class="row">
              <div class="col-md-4 col-sm-4">
                <div class="wide-banner cnt-strip">
                  <div class="image"> <img class="img-responsive" src="../assets/images/banners/home-banner1.jpg"
                      alt="">
                  </div>
                </div>
                <!-- /.wide-banner -->
              </div>

              <div class="col-md-4 col-sm-4">
                <div class="wide-banner cnt-strip">
                  <div class="image"> <img class="img-responsive" src="../assets/images/banners/home-banner3.jpg"
                      alt="">
                  </div>
                </div>
                <!-- /.wide-banner -->
              </div>

              <!-- /.col -->
              <div class="col-md-4 col-sm-4">
                <div class="wide-banner cnt-strip">
                  <div class="image"> <img class="img-responsive" src="../assets/images/banners/home-banner2.jpg"
                      alt="">
                  </div>
                </div>
                <!-- /.wide-banner -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.wide-banners -->

          <!-- ============================================== WIDE PRODUCTS : END ============================================== -->

          <!-- ============================================== WIDE PRODUCTS ============================================== -->
          <div class="wide-banners outer-bottom-xs">
            <div class="row">
              <div class="col-md-8">
                <div class="wide-banner1 cnt-strip">
                  <div class="image"> <img class="img-responsive" src="../assets/images/banners/home-banner.jpg" alt="">
                  </div>
                  <div class="strip strip-text">
                    <div class="strip-inner">
                      <h2 class="text-right">Amazing Sunglasses<br>
                        <span class="shopping-needs">Get 40% off on selected items</span>
                      </h2>
                    </div>
                  </div>
                  <div class="new-label">
                    <div class="text">NEW</div>
                  </div>
                  <!-- /.new-label -->
                </div>
                <!-- /.wide-banner -->
              </div>
              <!-- /.col -->
              <div class="col-md-4">
                <div class="wide-banner cnt-strip">
                  <div class="image"> <img class="img-responsive" src="../assets/images/banners/home-banner4.jpg"
                      alt="">
                  </div>


                  <!-- /.new-label -->
                </div>
                <!-- /.wide-banner -->
              </div>

            </div>
            <!-- /.row -->
          </div>
          <!-- /.wide-banners -->
          <!-- ============================================== WIDE PRODUCTS : END ============================================== -->



          <!-- /.sidebar-widget -->
          <!-- ============================================== BEST SELLER : END ============================================== -->

        </div>
        <!-- /.homebanner-holder -->
        <!-- ============================================== CONTENT : END ============================================== -->
      </div>
      <!-- /.row -->
      <!-- /.logo-slider -->
      <!-- ============================================== BRANDS CAROUSEL : END ============================================== -->

      <Product :products="products" />

    </div>
    <!-- /.container -->
  </div>
</template>

<script>
import Product from '../views/Product.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useIndexStore } from '../stores'
export default {
  components: {
    Product,
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchProduct"]),
  },
  computed: {
    ...mapState(useIndexStore, ["products"]),
  },
  created() {
    this.fetchProduct()
  }
}
</script>

<style scoped>

</style>