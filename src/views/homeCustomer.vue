<script>
import navbar from '../components/navbar.vue'
import { useMainStore } from '../stores'
import {mapActions, mapState} from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'

export default {
    components: {navbar},
    data() {
        return {
            search: '',
            dollar: '',
            id: ''          
        }
    },
    methods: {
        clearSearch(){
            this.search = ''
            this.getBarbers()
        },
        getUsd(price, id) {
            if(this.id === id) {
                this.dollar = ''
                this.id = ''
                this.getBarbers()
            } else {
                axios.get('https://api.happi.dev/v1/exchange/idr/usd?apikey=0aae8b0dWkDXdmVZoeo9TOoFvkt2mB0E50khDAVMYHbn6jChx0Q6nbov')
                .then(resp => {
                    this.dollar = '$ ' + (resp.data.result.from.price_usd*price).toFixed(2)
                    this.id = id
                    this.getBarbers()
                })
                .catch(resp => {
                    console.log(resp)
                })
            }
        },
        addFavorite(id){
            axios.post(`https://comfortablecutapp.herokuapp.com/customer/favorite/${+id}`, {}, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(resp => {
                this.$router.push('/customer/favorites')
                swal('Success add to favorite')
            })
            .catch (resp => {
                swal('Barber already a favorite')
            })
        },
        ...mapActions(useMainStore, ['findBarbers', 'goToBook']),
        getBarbers(){
            this.findBarbers(this.search)
        },
        bookAppointment(id) {
            this.goToBook(id)
        }
    }, 
    computed: {
        ...mapState(useMainStore, ['barberList'])
    },
    created(){
        this.getBarbers()
    }
}

</script>
<template>
<navbar/>
        <h1 style="text-align:center; font-family:cursive;" >Barbers List</h1>
        <div style="text-align:center">
            <input type="text" v-model="search" placeholder="Search" style="margin-right:10px">
            <button @click.prevent="getBarbers" class="btn btn-secondary" style="margin-right:10px">Search</button>
            <button @click.prevent="clearSearch" class="btn btn-secondary">Clear Search</button>
        </div>
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
                    <tr v-for="barbers in barberList" :key="barbers.id">
                        <td>{{barbers.name}}</td>
                        <td>{{barbers.email}}</td>
                        <td>
                            <button class="btn btn-secondary" @click.prevent="getUsd(barbers.price, barbers.id)">
                                <div v-if="barbers.id !== id">
                                    Rp. {{barbers.price}}
                                </div>
                                <div v-else>
                                    {{dollar}}
                                </div>
                            </button>
                        </td>
                        <td>{{barbers.location}}</td>
                        <td>
                            <button @click="addFavorite(barbers.id)" class="btn btn-secondary" style="margin-right:10px">Add To Fav</button>
                            <button @click="bookAppointment(barbers.id)" class="btn btn-secondary">Book appointment</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<style>
</style>