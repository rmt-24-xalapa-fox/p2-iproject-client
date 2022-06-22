<template>
    <div class="container-fluid d-flex justify-content-center align-items-center" style="background-color: orange; height: 100vh">
      <div class="border w-75 p-5 my-5 bg-white rounded-3 shadow">
        <div class="row">
          <div class="col-6">
            <img src="https://xflower-software.com/files/Blog/HU/ticketing-rendszer.jpg" alt="login-img" style="width: 100%;" />
          </div>
          <div class="col-6 align-self-center">
            <form @submit.prevent="register()">
              <div class="mb-3">
                <h5 class="mb-4">Register your account</h5>
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" autocomplete="off" v-model="email"/>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password"/>
              </div>
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

    export default{
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async register(){
                try{
                    if(this.$route.query.reg){
                        await axios({
                            method: 'post',
                            url: 'https://iproject-herdi-server.herokuapp.com/registeruser',
                            data: {
                                email: this.email,
                                password: this.password,
                                token: this.$route.query.reg
                            }
                        })
                        this.$router.push('/login')
                    }else{
                        await axios({
                            method: 'post',
                            url: 'https://iproject-herdi-server.herokuapp.com/registercompany',
                            data: {
                                email: this.email,
                                password: this.password
                            }
                        })
                        this.$router.push('/login')
                    }
                }catch(err){

                }
            }
        }
    }
</script>