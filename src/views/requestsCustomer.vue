<script>
import navbar from '../components/navbar.vue'
import { useMainStore } from '../stores'
import {mapActions, mapState} from 'pinia'

export default {
    components: {navbar},
    methods: {
        ...mapActions(useMainStore, ['getTransactions']),
        getAllTransaction(){
            this.getTransactions()
        }
    }, 
    computed: {
        ...mapState(useMainStore, ['transactions'])
    },
    created(){
        this.getAllTransaction()
    }
}

</script>

<template>
<navbar/>
        <h1 style="text-align:center; font-family:cursive;">Transactions</h1>
        <div class="card" style="margin:30px; margin-top: 20px">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <td>Barber</td>
                        <td>Day</td>            
                        <td>Note</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="trans in transactions" :key="trans.id">
                        <td>{{trans.Barber.name}}</td>
                        <td>{{trans.day}}</td>
                        <td>{{trans.note}}</td>
                        <td v-if="trans.status === 'Pending'" style="color:grey">..{{trans.status}}..</td>
                        <td v-if="trans.status === 'Accepted'" style="color:green">{{trans.status}}</td>
                        <td v-if="trans.status === 'Rejected'" style="color:red">{{trans.status}}</td>
                        <td v-if="trans.status === 'Finished'" style="color:black">{{trans.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<style>
</style>
