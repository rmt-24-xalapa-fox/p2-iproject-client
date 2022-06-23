<script>
import navbar from '../components/navbar.vue'
import { useMainStore } from '../stores'
import {mapActions, mapState} from 'pinia'
import axios from 'axios'
export default {
    components: {navbar},
    data(){
        return {
            dollar: '',
            id: ''           
        }
    },
    methods: {
        getUsd(price, id) {
            if(this.id === id) {
                this.dollar = ''
                this.id = ''
                this.getFavorites()
            } else {
                axios.get('https://api.happi.dev/v1/exchange/idr/usd?apikey=0aae8b0dWkDXdmVZoeo9TOoFvkt2mB0E50khDAVMYHbn6jChx0Q6nbov')
                .then(resp => {
                    this.dollar = '$ ' + (resp.data.result.from.price_usd*price).toFixed(2)
                    this.id = id
                    this.getFavorites()
                })
                .catch(resp => {
                    console.log(resp)
                })
            }
        },
        ...mapActions(useMainStore, ['findFavorites', 'goToBook']),
        getFavorites(){
            this.findFavorites()
        },
        bookAppointment(id) {
            this.goToBook(id)
        }
    }, 
    computed: {
        ...mapState(useMainStore, ['favoriteList'])
    },
    created(){
        this.getFavorites()
    }
}

</script>

<template>
<navbar/>
        <h1 style="text-align:center; font-family:cursive;">Favorites</h1>
                <div class="card" style="margin:30px; margin-top: 20px">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <td>Name</td>            
                        <td>Email</td>
                        <td>Tariff</td>
                        <td>Location</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="barbers in favoriteList" :key="barbers.id">
                        <td>{{barbers.Barber.name}}</td>
                        <td>{{barbers.Barber.email}}</td>
                        <td>
                            <button class="btn btn-secondary" @click.prevent="getUsd(barbers.Barber.price, barbers.Barber.id)">
                                <div v-if="barbers.Barber.id !== id">
                                    Rp. {{barbers.Barber.price}}
                                </div>
                                <div v-else>
                                    {{dollar}}
                                </div>
                            </button>
                        </td>
                        <td>{{barbers.Barber.location}}</td>
                        <td>
                            <button @click="bookAppointment(barbers.Barber.id)" class="btn btn-secondary">Book appointment</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<style>
</style>