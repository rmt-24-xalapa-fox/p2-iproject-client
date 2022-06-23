<script>
import axios from 'axios'

export default {
  name: "Register",
  emits: [],
  components: {},
  data() {
    return {
            name: '',
            email: '',
            password: '',
            location: '',
    };
  },
  methods: {
    registerSubmit() {
        axios.post(`https://comfortablecutapp.herokuapp.com/registerCustomer`, {
            name: this.name,
            email: this.email,
            password: this.password,
            location: this.location,
        })
        .then(resp => {
            this.$router.push('/customer/login')
            this.name = ''
            this.email = ''
            this.password = ''
            this.location = ''
            swal(`Account Registered!`)
        })
        .catch(errResp => {
            swal(errResp.response.data.error.message)
        })
    },
    goToLoginPage() {
        this.$router.push('/customer/login')
        this.name = ''
        this.email = ''
        this.password = ''
        this.location = ''
    }
  },
}
</script>


<template>
    <div style="background-color:cornsilk; height: 100vh; padding-top: 70px; padding-bottom: 70px;">
        <div class="card" style="margin:500px;  margin-top:0px; margin-bottom:0px; text-align:center">
            <h1 style="margin-top:30px; font-family:'Courier New', Courier, monospace">CUSTOMER</h1>
            <form @submit.prevent="registerSubmit">
                <br><input placeholder="Name" style="height: 40px; width:240px" v-model="name" type="text"><br><br>
                <input placeholder="Email" style="height: 40px; width:240px" v-model="email" type="text"><br><br>
                <input placeholder="Password" style="height: 40px; width:240px" v-model="password" type="password"><br><br>
                <input placeholder="Location" style="height: 40px; width:240px" v-model="location" type="text"><br><br>
                <button style="padding: 8px 90px" class="btn btn-primary" type="submit">Register</button><br><br> 
            </form>
            <p style="font-size:small">
                Already have an account? <a href="#" v-on:click="goToLoginPage">Login here</a>
            </p> 
        </div>
    </div>
</template>

<style>
</style>
