<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: "Login",
  emits: [],
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginSubmit() {
        axios.post("https://comfortablecutapp.herokuapp.com/loginBarber", {
          email: this.email,
          password: this.password
        })
        .then(resp => {
            localStorage.setItem("access_token", resp.data.data.accessToken)
            swal(`Welcome!`)
            this.$router.push('/barber/home')
        })
        .catch(errResp => {
            swal(errResp.response.data.error.message)
        })
    },
    goToRegisterPage() {
        this.email = ''
        this.password = ''
        this.$router.push('/barber/register')
    }
  },
}
</script>
<template>
    <div style="background-color:cornsilk; height: 100vh; padding-top: 100px;">
        <div class="card" style="margin:500px;  margin-top:0px; margin-bottom:0px; text-align:center">
            <h1 style="margin-top:30px; font-family:'Courier New', Courier, monospace">BARBER LOGIN</h1>
            <form @submit.prevent="loginSubmit">
                <br><input placeholder="Email" style="height: 40px; width:240px" v-model="email" type="text"><br>
                <br><input placeholder="Password" style="height: 40px; width:240px" v-model="password" type="password"><br><br>
                <button style="padding: 8px 100px" class="btn btn-primary" type="submit">Login</button><br><br> 
            </form>
            <br>
            <p style="font-size:small">
                Haven't registered? <a href="#" v-on:click="goToRegisterPage"> Register here</a>
            </p> 
        </div>
    </div>

</template>
<style>
</style>