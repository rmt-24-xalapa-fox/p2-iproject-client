<script>
import { useMainStore } from '../stores'
import {mapActions, mapState} from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'

export default {
    data() {
        return {
            note: '',
            date: '',
            month: ''
        }
    },
    methods: {
        addTransaction(id){
            let day =  `${this.month} - ${this.date}`
            if (!this.date || !this.month) {
                day = undefined
            }
            console.log(day)
            axios.post(`https://comfortablecutapp.herokuapp.com/customer/transaction/${id}`, {note: this.note, day}, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(resp => {
                this.$router.push('/customer/requests')
                swal('Appointment booked')
            })
            .catch(resp => {
                console.log(resp)
                swal(resp.response.data.error.message)
            })
        },
        goToHomePageAfterAddCancel(){
            this.$router.push('/customer/home')
        }
    },
    computed: {
        ...mapState(useMainStore, ['barberForBook'])
    },
    created() {
        this.Note = ''
        this.Date = ''
        this.Month = ''
    }
}
</script>
<template>
        <div style="background-color:cornsilk; height: 100vh; padding-top: 30px;overflow:auto">
            <div class="card" style="margin:300px;  margin-top:0px; margin-bottom:30px; padding-left:120px">
                <h1 style="margin-left:115px; margin-top:30px; font-family:'Courier New', Courier, monospace;">BOOKING FOR {{barberForBook.name}}</h1>
                <form @submit.prevent="addTransaction(barberForBook.id)">
                    <br>
                    Note <br><input placeholder="Note" style="height: 40px; width:600px" v-model="note" type="text"><br><br>
                    Date <br><input placeholder="Date" style="height: 40px; width:600px" v-model="date" type="number"><br><br>
                    Month <br><input placeholder="Month" style="height: 40px; width:600px" v-model="month" type="text"><br><br>            
                <button style="padding: 8px 275px" class="btn btn-primary" type="submit">Submit</button><br><br>
                <button style="padding: 8px 275px; margin-bottom:30px;background-color: rgb(211, 93, 93);" class="btn btn-primary" v-on:click="goToHomePageAfterAddCancel">Cancel</button>
                </form>
            </div>
        </div>
</template>
<style>
</style>