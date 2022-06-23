<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import TableRowUnit from '../components/TableRowUnit.vue';
import Filter from '../components/FIlter.vue';
import FIlter from '../components/FIlter.vue';

export default {
    name: "RentalanInfo",
    components: {
    Filter,
    StripeCheckout,
    TableRowUnit,
    FIlter
},
    data() {
        this.publishableKey = "pk_test_51LD3zSGsdBMqOjdKIb4BRSiGTvU83wzJtWzk6XgbMSsiihtxfS1wovHiyicDl3Q9qWqLvnbN2Fpj6NsGn6fLovfI00Aq3CB98E"
        return {
            loading: false,
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
        ...mapActions(useCounterStore, ["fetchRentalanById", "hitStripe", "bookedUnit"]),

        submit(id) {
            this.hitStripe()
            this.bookedUnit(id)
        }
    },
    computed: {
        ...mapState(useCounterStore, ["perRentalan"])
    },
    created() {
        this.fetchRentalanById(this.$route.params.id)
    },
}
</script>

<template>
    <div class="atas">
        <h2>{{ perRentalan.name }}</h2>
        <p>Address : {{ perRentalan.address }}</p>
        <p>Phone: {{ perRentalan.phone }}</p>
    </div>
    <div>
      <h5>List unit of PS you can booked everywhere</h5>
      <Filter />
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
                <TableRowUnit v-for="(unit, i) in perRentalan.Units" :key="unit.id" :unit="unit, i" />
                <!-- <tr v-for="(unit, i) in perRentalan.Units" :key="unit.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ unit.psType }}</td>
                    <td class="btn-outline-success">{{ unit.status }}</td>
                    <td>
                        <button v-if="unit.status==='available'" class="btn btn-success" @click="submit(unit.id)" type="submit">Booked</button>
                    </td>

                </tr> -->

            </tbody>
        </table>
    </div>
</template>

<style scoped>
* {
    margin-left: 20px;
}
.atas {
    margin-top: 80px;
}
</style>