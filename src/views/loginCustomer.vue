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
        axios.post("https://comfortablecutapp.herokuapp.com/loginCustomer", {
          email: this.email,
          password: this.password
        })
        .then(resp => {
            localStorage.setItem("access_token", resp.data.data.accessToken)
            swal(`Welcome!`)
            this.$router.push('/customer/home')
        })
        .catch(errResp => {
            swal(errResp.response.data.error.message)
        })
    },
    handleCredentialResponse(response) {
        axios.post("https://comfortablecutapp.herokuapp.com/customerGoogle-login", {}, {
            headers: {
                credential: response.credential
            }
        })
        .then(resp => {
            const token = resp.data.data.accessToken
            localStorage.setItem("access_token", token)
            swal(`Welcome!`)
            this.$router.push('/customer/home')
        })
        .catch(errResp => {
            swal(errResp.response.data.error.message)
        })
    },
    goToRegisterPage() {
        this.email = ''
        this.password = ''
        this.$router.push('/customer/register')
    }
  },
  mounted() {
    const cb = this.handleCredentialResponse
    google.accounts.id.initialize({
        client_id: "541223077075-drps4un15vc03nundeb3ga5k8qdibqeb.apps.googleusercontent.com",
        callback: cb
    });
    google.accounts.id.renderButton(
        document.getElementById("googleButtonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
  },
}
</script>
<template>
    <div style="background-color:cornsilk; height: 100vh; padding-top: 100px;">
        <div class="card" style="margin:500px;  margin-top:0px; margin-bottom:0px; text-align:center">
            <h1 style="margin-top:30px; font-family:'Courier New', Courier, monospace">CUSTOMER LOGIN</h1>
            <form @submit.prevent="loginSubmit">
                <br><input placeholder="Email" style="height: 40px; width:240px" v-model="email" type="text"><br>
                <br><input placeholder="Password" style="height: 40px; width:240px" v-model="password" type="password"><br><br>
                <button style="padding: 8px 100px" class="btn btn-primary" type="submit">Login</button><br><br> 
            </form>
            <div>or</div><br>
            <div style="display:flex; justify-content:center;">
                <div id="googleButtonDiv"
                    data-client_id="YOUR_GOOGLE_CLIENT_ID"
                    data-login_uri="https://your.domain/your_login_endpoint"
                    data-auto_prompt="false"
                >
                </div>
                <div class="g_id_signin"
                    data-type="standard"
                    data-size="large"
                    data-theme="outline"
                    data-text="sign_in_with"
                    data-shape="rectangular"
                    data-logo_alignment="left">
                </div>
            </div>
            <br><br>
            <p style="font-size:small">
                Haven't registered? <a href="#" v-on:click="goToRegisterPage"> Register here</a>
            </p> 
        </div>
    </div>
</template>
<style>
</style>

