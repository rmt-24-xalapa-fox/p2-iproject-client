<template>
    <header class="header-style-1">

        <!-- ============================================== TOP MENU ============================================== -->
        <div class="top-bar animate-dropdown">
            <div class="container">
                <div class="header-top-inner">
                    <div class="cnt-account">
                        <ul class="list-unstyled">
                            <li class="header_cart hidden-xs">
                                <RouterLink to="/cart"><span>My Cart</span></RouterLink>
                            </li>
                            <li class="login">
                                <RouterLink to="/login" v-if="!userLogin"><span>Login</span></RouterLink>
                                <RouterLink to="/login" v-if="userLogin" @click.prevent="logout"><span>Logout</span>
                                </RouterLink>
                            </li>

                        </ul>
                    </div>
                    <!-- /.cnt-account -->


                    <!-- /.cnt-cart -->
                    <div class="clearfix"></div>
                </div>
                <!-- /.header-top-inner -->
            </div>
            <!-- /.container -->
        </div>
        <!-- /.header-top -->
        <!-- ============================================== TOP MENU : END ============================================== -->
        <div class="main-header">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-3 logo-holder">
                        <!-- ============================================================= LOGO ============================================================= -->
                        <div class="logo">
                            <RouterLink to="/"> <img src="../assets/images/logo.png" alt="logo"> </RouterLink>
                        </div>
                        <!-- /.logo -->
                        <!-- ============================================================= LOGO : END ============================================================= -->
                    </div>
                    <!-- /.logo-holder -->

                    <div class="col-lg-7 col-md-6 col-sm-8 col-xs-12 top-search-holder">
                        <!-- /.contact-row -->
                        <!-- ============================================================= SEARCH AREA ============================================================= -->
                        <div class="search-area">
                            <form>
                                <div class="control-group">
                                    <ul class="categories-filter animate-dropdown">
                                        <li class="dropdown"> <a class="dropdown-toggle" data-toggle="dropdown"
                                                href="category.html">Categories <b class="caret"></b></a>
                                            <ul class="dropdown-menu" role="menu">
                                                <li class="menu-header">Computer</li>
                                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">-
                                                        Clothing</a>
                                                </li>
                                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">-
                                                        Electronics</a>
                                                </li>
                                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">-
                                                        Shoes</a></li>
                                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">-
                                                        Watches</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <input class="search-field" placeholder="Search here..." />
                                    <a class="search-button" href="#"></a>
                                </div>
                            </form>
                        </div>
                        <!-- /.search-area -->
                        <!-- ============================================================= SEARCH AREA : END ============================================================= -->
                    </div>
                    <!-- /.top-search-holder -->

                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 animate-dropdown top-cart-row">
                        <!-- ============================================================= SHOPPING CART DROPDOWN ============================================================= -->

                        <div class="dropdown dropdown-cart"> <a href="#" class="dropdown-toggle lnk-cart"
                                data-toggle="dropdown">
                                <div class="items-cart-inner">
                                    <div class="basket">
                                        <div class="basket-item-count"><span class="count">{{totalItem}}</span></div>
                                        <div class="total-price-basket"> <span class="lbl">Shopping Cart</span> <span
                                                class="value" style="font-size: 16px">Rp. {{
                                                totalPrice.toLocaleString('de-DE',
                                                { minimumFractionDigits: 2 })
                                                }}</span> </div>
                                    </div>
                                </div>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <div class="cart-item product-summary">
                                        <div class="row" v-for="cart in carts" :key="cart.id">
                                            <div class="col-xs-4">
                                                <div class="image"> <a href="#"><img :src="cart.images_list[0]"
                                                            alt=""></a>
                                                </div>
                                            </div>
                                            <div class="col-xs-7">
                                                <h3 class="name"><a href="#">{{cart.title}}</a>
                                                </h3>
                                                <div class="price">Rp. {{
                                                    Number(cart.price).toLocaleString('de-DE',
                                                    {minimumFractionDigits: 2 })}}</div>
                                            </div>
                                            <div class="col-xs-1 action"> <a href="#"
                                                    @click.prevent="btnDelete(cart.Cart.ProductId)"><i
                                                        class="fa fa-trash"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.cart-item -->
                                    <div class="clearfix"></div>
                                    <hr>
                                    <div class="clearfix cart-total">
                                        <div class="pull-right"> <span class="text">Sub Total :</span><span
                                                class='price'>Rp. {{ totalPrice.toLocaleString('de-DE',
                                                { minimumFractionDigits: 2 })
                                                }}</span>
                                        </div>
                                        <div class="clearfix"></div>
                                        <a href="#" class="btn btn-upper btn-primary btn-block m-t-20"
                                            @click.prevent="midtransPage(totalPrice)">Checkout</a>
                                    </div>
                                    <!-- /.cart-total-->

                                </li>
                            </ul>
                            <!-- /.dropdown-menu-->
                        </div>
                        <!-- /.dropdown-cart -->

                        <!-- ============================================================= SHOPPING CART DROPDOWN : END============================================================= -->
                    </div>
                    <!-- /.top-cart-row -->
                </div>
                <!-- /.row -->

            </div>
            <!-- /.container -->

        </div>
        <!-- /.main-header -->

        <!-- ============================================== NAVBAR ============================================== -->
        <div class="header-nav animate-dropdown">
            <div class="container">
                <div class="yamm navbar navbar-default" role="navigation">
                    <div class="navbar-header">
                        <button data-target="#mc-horizontal-menu-collapse" data-toggle="collapse"
                            class="navbar-toggle collapsed" type="button">
                            <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span
                                class="icon-bar"></span> <span class="icon-bar"></span> </button>
                    </div>
                    <div class="nav-bg-class">
                        <div class="navbar-collapse collapse" id="mc-horizontal-menu-collapse">
                            <div class="nav-outer">
                                <ul class="nav navbar-nav">
                                    <li class="active dropdown">
                                        <RouterLink to="/">Home</RouterLink>
                                    </li>
                                    <li class="dropdown">
                                        <RouterLink to="/blog">Blog</RouterLink>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.nav-outer -->
                        </div>
                        <!-- /.navbar-collapse -->

                    </div>
                    <!-- /.nav-bg-class -->
                </div>
                <!-- /.navbar-default -->
            </div>
            <!-- /.container-class -->

        </div>
        <!-- /.header-nav -->
        <!-- ============================================== NAVBAR : END ============================================== -->

    </header>
</template>

<script>
import { mapActions, mapState } from "pinia"
import { useIndexStore } from "../stores"

export default {
    computed: {
        ...mapState(useIndexStore, ["userLogin", "totalPrice", "carts", "totalItem", "tokenMidtrans"])
    },
    methods: {
        ...mapActions(useIndexStore, ["readCart", "deleteCart", "midtransStore"]),
        logout: function () {
            this.userLogin = true
            localStorage.clear()
            this.$router.push("/login")
        },
        btnDelete(id) {
            this.deleteCart(id)
                .then(() => {
                    this.readCart()
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: `Success deleted product from cart!`,
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Failed deleted product from cart!`,
                    });
                })
        },
        midtransPage(totalHarga){
                this.midtransStore(totalHarga)
                .then(() => {
                    this.payButton(this.tokenMidtrans)
                })
                .catch((err) => {
                    Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `Failed hit midtrans!`,
                        });
                })
            },
        payButton: function (token) {
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: `Payment success!`,
                    });
                    console.log(result);
                },
                onPending: function (result) {
                    Swal.fire({
                        title: 'Waiting your payment!',
                        width: 600,
                        padding: '3em',
                        color: '#716add',
                        background: '#fff url(/images/trees.png)',
                        backdrop: `
                                    rgba(0,0,123,0.4)
                                    url("/images/nyan-cat.gif")
                                    left top
                                    no-repeat
                                `
                    })
                    console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `payment failed!`,
                    }); console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    Swal.fire({
                        icon: "info",
                        title: "You closed the popup without finishing the payment",
                    }); console.log(result);
                }
            })
        },
    },
    created() {
        this.totalItem
        this.totalPrice
        this.readCart()
    }
}
</script>

<style scoped>

</style>