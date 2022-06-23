<script>
import navbarBarber from '../components/navbarBarber.vue'
import { useMainStore } from '../stores'
import { mapActions, mapState } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'
export default {
    components: {navbarBarber},
    methods: {
        accept(id) {
            axios.put(`https://comfortablecutapp.herokuapp.com/barber/updateStatus/${id}`, {status: 'Accepted'}, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(resp => {
                swal('Request accepted')
                this.getBarbersList()
            })
            .catch(err => {
                this.getBarbersList()
            })
        },
        reject(id) {
            axios.put(`https://comfortablecutapp.herokuapp.com/barber/updateStatus/${id}`, {status: 'Rejected'}, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(resp => {
                swal('Request rejected')
                this.getBarbersList()
            })
            .catch(err => {
                this.getBarbersList()
            })
        },
        ...mapActions(useMainStore, ['getBarberSchedule']),
        getBarbersList(){
            this.getBarberSchedule()
        }
    },
    computed: {
        ...mapState(useMainStore, ['barberSchedule'])
    },
    created() {
        this.getBarbersList()
    }
}
</script>
<template>
<navbarBarber/>
        <h1 style="text-align:center; font-family:cursive;">Notifications</h1>
        <div class="card" style="margin:30px; margin-top: 20px">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <td>Desc</td>
                        <td>-</td>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="data in barberSchedule.transactions" :key="data.id">
                            <td>Customer {{data.Customer.name}} requested to cut hair at {{data.Customer.location}}, {{data.day}}</td>
                            <td v-if="data.status === 'Pending'">
                                <button @click="accept(data.id)">Accept</button>
                                <button @click="reject(data.id)">Reject</button>
                            </td>
                            <td v-if="data.status !== 'Pending'">
                            {{data.status}}
                            </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<style>
</style>
