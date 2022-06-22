<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import {StripeCheckout} from '@vue-stripe/vue-stripe'

export default {
    name: "RentalanInfo",
    components: {
        StripeCheckout
    },
    data() {
        this.publihableKey = "pk_test_51LD3zSGsdBMqOjdKIb4BRSiGTvU83wzJtWzk6XgbMSsiihtxfS1wovHiyicDl3Q9qWqLvnbN2Fpj6NsGn6fLovfI00Aq3CB98E"
        return {
            loading:false,
            lineItems: [
                {
                    price: 'price_1LD42KGsdBMqOjdK8Bn5wP92',
                    quantity: 1
                }
            ],
            successURL: 'http://localhost:8080/success',
            cancelURL: 'http://localhost:8080/error'
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchRentalanById"]),

        submit() {
            // stripe checkout
            this.$refs.checkoutRef.redirectToCheckout()
        }
    },
    computed: {
        ...mapState(useCounterStore, ["perRentalan"])
    },
    created() {
        this.fetchRentalanById(this.$route.params.id)
    }
}
</script>

<template>
    <div>
        <h2>{{perRentalan.name}}</h2>
        <p>Address : {{perRentalan.address}}</p>
        <p>Phone: {{perRentalan.phone}}</p>
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">PS Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(unit, i) in perRentalan.Units" :key="unit.id">
                    <th scope="row">{{i+1}}</th>
                    <td>{{unit.psType}}</td>
                    <td class="btn-outline-success">{{unit.status}}</td>
                    <Stripe-checkout
                    ref="checkoutRef"
                    mode="payment"
                    :pk="PublishableKey"
                    :line-items="lineItems"
                    :success-url="successURL"
                    :cancel-url="cancelURL"
                    @loading="v => loading = v"
                    />
                    <td><button @click="submit" type="button" class="btn btn-success">Book</button></td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>

<style scoped>
template {
    margin-top: 10px;
    margin-left: 20px;
}
</style>