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
                                        <th class="cart-qty item">Quantity</th>
                                        <th class="cart-sub-total item">Subtotal</th>
                                        <th class="cart-total last-item">Grandtotal</th>
                                    </tr>
                                </thead><!-- /thead -->

                                <tbody>
                                    <tr v-for="cart in carts" :key="cart.id">
                                        <td class="romove-item"><a href="#" title="cancel" class="icon"><i
                                                    class="fa fa-trash-o"></i></a></td>
                                        <td class="cart-image">
                                            <a class="entry-thumbnail" href="#">
                                                <img :src="cart.images_list[0]" alt="">
                                            </a>
                                        </td>
                                        <td class="cart-product-name-info">
                                            <h4 class='cart-product-description'><a href="#">{{cart.title}}</a></h4>
                                        </td>
                                        <td class="cart-product-quantity">
                                            <div class="quant-input">
                                                <div class="arrows">
                                                    <div class="arrow plus gradient"><span class="ir"><i
                                                                class="icon fa fa-sort-asc"></i></span></div>
                                                    <div class="arrow minus gradient"><span class="ir"><i
                                                                class="icon fa fa-sort-desc"></i></span></div>
                                                </div>
                                                <input type="text" value="1">
                                            </div>
                                        </td>
                                        <td class="cart-product-sub-total"><span class="cart-sub-total-price">Rp. {{
                                        Number(cart.price).toLocaleString('de-DE',
                                        {minimumFractionDigits: 2 })}}</span></td>
                                        <td class="cart-product-grand-total"><span
                                                class="cart-grand-total-price">Rp. {{ Number(cart.price).toLocaleString('de-DE',
                                                {minimumFractionDigits: 2 })}}</span></td>
                                    </tr>
                                </tbody><!-- /tbody -->

                                <tfoot>
                                    <tr>
                                        <td colspan="7">
                                            <div class="shopping-cart-btn">
                                                <span class="">
                                                    <a href="#" class="btn btn-upper btn-primary outer-left-xs">Continue
                                                        Shopping</a>
                                                    <a href="#"
                                                        class="btn btn-upper btn-primary pull-right outer-right-xs">Update
                                                        shopping cart</a>
                                                </span>
                                            </div><!-- /.shopping-cart-btn -->
                                        </td>
                                    </tr>
                                </tfoot>
                            </table><!-- /table -->
                        </div>
                    </div><!-- /.shopping-cart-table -->

                    

                    <div class="col-md-4 col-sm-12 cart-shopping-total justify-content-center">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="cart-sub-total">
                                            Subtotal<span class="inner-left-md">$600.00</span>
                                        </div>
                                        <div class="cart-grand-total">
                                            Grand Total<span class="inner-left-md">$600.00</span>
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
                                            <span class="">Checkout with multiples address!</span>
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
            ...mapActions(useIndexStore, ["readCart"]),
            payButton: function () {
                window.snap.pay('d22aa6f0-50cc-4427-b9ba-3ba2db799166', {
                    onSuccess: function (result) {
                        /* You may add your own implementation here */
                        alert("payment success!"); console.log(result);
                    },
                    onPending: function (result) {
                        /* You may add your own implementation here */
                        alert("wating your payment!"); console.log(result);
                    },
                    onError: function (result) {
                        /* You may add your own implementation here */
                        alert("payment failed!"); console.log(result);
                    },
                    onClose: function () {
                        /* You may add your own implementation here */
                        alert('you closed the popup without finishing the payment');
                    }
                })
            }
        },
        computed: {
            ...mapState(useIndexStore, ["carts"])
        },
        created() {
            this.readCart()
        }
    }
</script>

<style scoped>

</style>