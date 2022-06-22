<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores/main";
import Login from '../components/Login.vue'
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            messageErrorPassword: "",
            messageErrorEmail: "",
            messageErrorUsername: "",
            isError: false,
            hasRegistered: false,
        }
    },
    methods: {
        ...mapActions(useMainStore, ['register']),
        registerForm: function () {
            this.register(this.email, this.password, this.username)
                .then(() => {
                    this.hasRegistered = true
                })
                .catch((err) => {
                    const errors = err.response.data.message
                    errors.forEach((error) => {
                        if (error === 'Email is required' || error === 'Invalid email format') {
                            this.messageErrorEmail = error
                        } else if (error === 'Password is required' || error === "Password should have at least 5 characters") {
                            this.messageErrorPassword = error
                        } else if (error === 'Username is required'){
                            this.messageErrorUsername = error
                        }else {
                            this.messageErrorEmail = ""
                            this.messageErrorPassword = ""
                        }
                    })
                    this.isError = true
                })
        }
    },
    watch: {
        password(value) {
            if (value.length < 5) {
                this.messageErrorPassword = "Password should have at least 5 characters"
            } else {
                this.messageErrorPassword = ""
            }
        },
        username(newValue, oldValue){
            if(newValue !== oldValue){
                this.isError = false
            }
        }
    },
    components:{
        Login
    }
}
</script>
<template>
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register Form</h5>
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
                                    <form @submit.prevent="registerForm" v-show="!hasRegistered">

                                        <!-- Username input -->
                                        <div class="form-outline mb-4">
                                            <div style="color: red;" v-if="isError">
                                                <p>{{ messageErrorUsername }}</p>
                                            </div>
                                            <input type="text" id="f1" class="form-control form-control-lg"
                                                placeholder="Enter your Username" v-model="username" />
                                            <label class="form-label" for="f1">Username</label>
                                        </div>

                                        <!-- Email input -->
                                        <div class="form-outline mb-4">
                                            <div style="color: red;" v-if="isError">
                                                <p>{{ messageErrorEmail }}</p>
                                            </div>
                                            <input type="email" id="2" class="form-control form-control-lg"
                                                placeholder="Enter your Email" v-model="email" />
                                            <label class="form-label" for="2">Email address</label>
                                        </div>

                                        <!-- Password input -->
                                        <div class="form-outline mb-3">
                                            <div style="color: red;" v-if="isError">
                                                <p>{{ messageErrorPassword }}</p>
                                            </div>
                                            <input type="password" id="3"
                                                class="form-control form-control-lg" placeholder="Enter password"
                                                v-model="password" />
                                            <label class="form-label" for="3">Password</label>
                                        </div>

                                        <div class="text-center text-lg-start mt-4 pt-2">
                                            <button type="submit" class="btn btn-lg"
                                                style="padding-left: 2.5rem; padding-right: 2.5rem;background-color: rgba(231, 253, 253, 1);">Register</button>
                                        </div>

                                    </form>
                                    <div v-show="hasRegistered">
                                    <img src="https://www.legalpillers.com/wp-content/uploads/2020/09/success.gif" alt="">
                                        <h1>Welcome, Beauty!</h1>
                                        <button type="button" class="btn btn-primary dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Now, you can sign in here :)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <Login/>
    </div>
</template>