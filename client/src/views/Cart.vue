<template>
    <div class="body-content outer-top-xs">
        <div class="container">
            <div class="row ">
                <div class="shopping-cart">
                    <div class="shopping-cart-table ">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="cart-romove item">Remove</th>
                                        <th class="cart-description item">Image</th>
                                        <th class="cart-product-name item">Product Name</th>
                                        <th class="cart-product-name item">Brand</th>
                                        <th class="cart-sub-total item">Subtotal</th>
                                    </tr>
                                </thead><!-- /thead -->

                                <tbody>
                                    <tr v-for="cart in carts" :key="cart.id">
                                        <td class="romove-item"><a href="#" title="cancel" class="icon"
                                                @click.prevent="btnDelete(cart.Cart.ProductId)"><i
                                                    class="fa fa-trash-o"></i></a></td>
                                        <td class="cart-image">
                                            <a class="entry-thumbnail" href="#">
                                                <img :src="cart.images_list[0]" alt="">
                                            </a>
                                        </td>
                                        <td class="cart-product-name-info">
                                            <h4 class='cart-product-description'><a href="#">{{cart.title}}</a></h4>
                                        </td>
                                        <td class="cart-product-name-info">
                                            <h4 class='cart-product-description'><a href="#">{{cart.brand}}</a></h4>
                                        </td>
                                        <td class="cart-product-sub-total"><span class="cart-sub-total-price">Rp. {{
                                                Number(cart.price).toLocaleString('de-DE',
                                                {minimumFractionDigits: 2 })}}</span>
                                        </td>
                                    </tr>
                                </tbody><!-- /tbody -->

                                <tfoot>
                                    <tr>
                                        <td colspan="7">
                                            <div class="shopping-cart-btn">
                                                <span class="">
                                                    <RouterLink to="/" class="btn btn-upper btn-primary outer-left-xs">
                                                        Continue
                                                        Shopping</RouterLink>
                                                    <RouterLink to="/"
                                                        class="btn btn-upper btn-primary pull-right outer-right-xs">
                                                        Update
                                                        shopping cart</RouterLink>
                                                </span>
                                            </div><!-- /.shopping-cart-btn -->
                                        </td>
                                    </tr>
                                </tfoot>
                            </table><!-- /table -->
                        </div>
                    </div><!-- /.shopping-cart-table -->



                    <div class="col-md-12 col-sm-12 cart-shopping-total">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="cart-sub-total">
                                            Subtotal<span class="inner-left-md">Rp. {{
                                                totalPrice.toLocaleString('de-DE',
                                                { minimumFractionDigits: 2 })
                                                }}</span>
                                        </div>
                                        <div class="cart-grand-total">
                                            Grand Total<span class="inner-left-md">Rp. {{
                                                totalPrice.toLocaleString('de-DE',
                                                { minimumFractionDigits: 2 })
                                                }}</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead><!-- /thead -->
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="cart-checkout-btn pull-right">
                                            <button type="submit" class="btn btn-primary checkout-btn"
                                                @click.prevent="payButton">PROCCED TO
                                                CHEKOUT</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody><!-- /tbody -->
                        </table><!-- /table -->
                    </div><!-- /.cart-shopping-total -->
                </div><!-- /.shopping-cart -->
            </div> <!-- /.row -->
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useIndexStore } from '../stores'

    export default {
        methods: {
            ...mapActions(useIndexStore, ["readCart", "deleteCart"]),
            payButton: function () {
                window.snap.pay('d22aa6f0-50cc-4427-b9ba-3ba2db799166', {
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
        },
        computed: {
            ...mapState(useIndexStore, ["carts", "totalPrice"]),
        },
        created() {
            this.readCart()
        }
    }
</script>

<style scoped>

</style>