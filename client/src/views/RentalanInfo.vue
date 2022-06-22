<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "RentalanInfo",
    data() {
        return {
            status:""
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchRentalanById"])
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
                    <td><button type="button" class="btn btn-success">Book</button></td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>

<style scoped>
* {
    margin-top: 10px;
    margin-left: 20px;
}
</style>