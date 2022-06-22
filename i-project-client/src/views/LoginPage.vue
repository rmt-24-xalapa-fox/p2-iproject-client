<script>

import { mapActions, mapWritableState } from 'pinia'
import { useMusicYuhu } from '../stores/counter.js'
import router from '../router/index.js'
import axios from 'axios'

export default {
  name: "LoginPage",
  methods: {
    ...mapActions(useMusicYuhu, ["loginprocess"]),
    handleCredentialResponse(response) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/loginGoogle`,
        data: {
          credential: response.credential
        }
      })
        .then(resp => {
          const { access_token, nameSocialMedia } = resp.data

          localStorage.access_token = access_token

          swal({
            title: "Success",
            text: `Welcome!`,
            icon: "success",
          });

          router.push("/home")

        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  computed: {
    ...mapWritableState(useMusicYuhu, ["userlogin"])
  },
  mounted() {
    const cb = this.handleCredentialResponse
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "930840140219-huh4nev0nnjlb55hh73o5ummovpp4ds4.apps.googleusercontent.com",
        callback: cb
      });
      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large" }  // customization attributes
      );
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row content">
      <div class="col-md-6">
        <img src="https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg" class="img-fluid" alt="image"
          id="imageInput">
      </div>
      <div class="col-md-6">
        <h3 class="signin-text mb-3"> Sign In</h3>
        <form action="" class="loginForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="userlogin.email" placeholder="" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="userlogin.password" placeholder="" class="form-control">
          </div>
          <div class="mb-3">
            <button type="submit" @click.prevent="loginprocess" class="btn btn-block text-uppercase">
              Login
            </button>
          </div>
        </form>
        <div class="text-center mb-3">
          or login with
        </div>
        <div id="btn-login-gugel" data-client_id="YOUR_GOOGLE_CLIENT_ID"
          data-login_uri="https://your.domain/your_login_endpoint" data-auto_prompt="false">
        </div>
        <div class="g_id_signin" data-type="standard" data-size="large" data-theme="outline" data-text="sign_in_with"
          data-shape="rectangular" data-logo_alignment="left">
        </div>
        
        <div id="google-button">
          <p>Welcome! {{ email }}</p>
          <button @click.prevent="googleSignOut">Sign In</button>
        </div>

        <hr class="my-4">

        <div class="text-center mb-2">
          Don't have an account?
          <a href="signUp.html" class="register-link">
            Register here
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
    url("https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg");
}

.content {
  background-color: #4d8d83;
  position: relative;
  margin: 8%;
  padding: 4rem 1rem 4rem 1rem;
  box-shadow: 0 0 5px 5px;
}

.form-control {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

#imageInput {
  position: relative;
  top: 10px;
}

#google-button {
    position: relative;
    display: flex;
    left: 28%;
    
}




/* ============================ */
</style>
