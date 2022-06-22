<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores/main";
export default {
    data(){
        return{
            email: "",
            password: "",
            hasLoggedIn: false,
            error: ""
        }
    },
    methods:{
        ...mapActions(useMainStore, ["loginAction", "loginWithGoogle"]),
        loginForm: function(){
            this.loginAction(this.email, this.password)
                .then(()=>{
                    this.hasLoggedIn = true
                })
                .catch((err) => {
                    console.log(err)
                    this.error = err.response.data.message
                })
        }
    },
    watch: {
        email(value){
            if(value === ""){
                this.error = ""
            }
        }
    }
}
</script>
<template>
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login Form</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <section>
                        <div class="container-fluid h-custom">
                            <div class="row d-flex justify-content-center align-items-center h-100">
                                <div class="col-md-9 col-lg-6 col-xl-5">
                                    <img src="http://cdn.onlinewebfonts.com/svg/img_396480.png" class="img-fluid"
                                        alt="Sample image">
                                </div>
                                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                    <p style="color: red;">{{error}}</p>
                                    <form @submit.prevent="loginForm" v-show="!hasLoggedIn">
                                        <!-- Email input -->
                                        <div class="form-outline mb-4">
                                            <input type="email" v-model="email" id="form3Example3" class="form-control form-control-lg"
                                                placeholder="Enter a valid email address" />
                                            <label class="form-label" for="form3Example3">Email address</label>
                                        </div>

                                        <!-- Password input -->
                                        <div class="form-outline mb-3">
                                            <input type="password" v-model="password" id="form3Example4"
                                                class="form-control form-control-lg" placeholder="Enter password" />
                                            <label class="form-label" for="form3Example4">Password</label>
                                        </div>

                                        <div class="text-center text-lg-start mt-4 pt-2">
                                            <button type="submit" class="btn btn-lg"
                                                style="padding-left: 2.5rem; padding-right: 2.5rem;background-color: rgba(231, 253, 253, 1);">Login</button>
                                            
                                        </div>

                                    </form>
                                    <div v-show="hasLoggedIn">
                                        <h1>You have successfully logged in!</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>