<template>
     <!-- Login -->
    <div class="container-fluid d-flex justify-content-center align-items-center" style="background-color: orange; height: 100vh">
      <div class="border w-75 p-5 my-5 bg-white rounded-3 shadow">
        <div class="row">
          <div class="col-6">
            <img src="https://xflower-software.com/files/Blog/HU/ticketing-rendszer.jpg" alt="login-img" style="width: 100%;" />
          </div>
          <div class="col-6 align-self-center">
            <form @submit.prevent="signin()">
              <div class="mb-3">
                <h5 class="mb-4">Sign in to your account</h5>
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" autocomplete="off" v-model="email"/>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password"/>
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
            <router-link to="/register">Register Company??</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- End Login -->
</template>

<script>
import axios from 'axios'

    export default {
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async signin(){
              try{
                const user = await axios({
                  method: 'post',
                  url: 'https://iproject-herdi-server.herokuapp.com/logincompany',
                  data: {
                    email: this.email,
                    password: this.password
                  }
                })
                localStorage.setItem('access_token', user.data.access_token)
                localStorage.setItem('role', 'company')
                this.$router.push('/users')
              }catch(err){
                console.log(err)
              }
            }
        }
    }
</script>