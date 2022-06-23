<script>
import navbarBarber from '../components/navbarBarber.vue'
import { useMainStore } from '../stores'
import { mapActions, mapState } from 'pinia'
import axios from 'axios'
export default {
    components: {navbarBarber},
    methods: {
        finish(id) {
            axios.put(`https://comfortablecutapp.herokuapp.com/barber/updateStatus/${id}`, {status: 'Finished'}, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(resp => {
                swal('Request finished')
                this.$router.push('/barber/transactions')
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
        <h1 style="text-align:center; font-family:cursive;">Scheduled Appointments</h1>
        <div class="card" style="margin:30px; margin-top: 20px">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <td>Day</td>
                        <td>Customer</td>            
                        <td>Location</td>
                        <td>-</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in barberSchedule.transactions" :key="data.id">
                        <td v-if="data.status === 'Accepted'">{{data.day}}</td>
                        <td v-if="data.status === 'Accepted'">{{data.Customer.name}}</td>
                        <td v-if="data.status === 'Accepted'">{{data.Customer.location}}</td>
                        <td v-if="data.status === 'Accepted'">
                            <button @click="finish(data.id)">Finish</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<style>
</style>