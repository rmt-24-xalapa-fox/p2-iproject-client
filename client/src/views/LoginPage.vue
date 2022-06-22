<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'


export default {
    name: "LoginPage",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["loginHandler", "facebookLogin"]),
        
        // checkLoginState() {
        //     FB.getLoginStatus(function (response) {
        //         statusChangeCallback(response);
        //     });
        // }

    },
    
    created() {
       

        // FB.getLoginStatus(function (response) {
        //     statusChangeCallback(response);
        // });

        // window.fbAsyncInit = function () {
        //     FB.init({
        //         appId: '1382494195590177',
        //         cookie: true,
        //         xfbml: true,
        //         version: 'v14.0'
        //     });

        //     FB.AppEvents.logPageView();

        // };

        // (function (d, s, id) {
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) { return; }
        //     js = d.createElement(s); js.id = id;
        //     js.src = "https://connect.facebook.net/en_US/sdk.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'facebook-jssdk'));
    }
}
</script>

<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex align-items-center justify-content-center h-100">
                <div class="col-md-8 col-lg-7 col-xl-6">
                    <img src="../assets/img/stik ps.jpg" class="img-fluid" alt="Phone image">
                </div>
                <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <h3 class="center">Login</h3><br>
                    <form>
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input v-model="email" type="email" id="form1Example13"
                                class="form-control form-control-lg" />
                            <label class="form-label" for="form1Example13">Email address</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <input v-model="password" type="password" id="form1Example23"
                                class="form-control form-control-lg" />
                            <label class="form-label" for="form1Example23">Password</label>
                        </div>

                        <div class="d-flex justify-content-around align-items-center mb-4">
                            <!-- Checkbox -->
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                <label class="form-check-label" for="form1Example3"> Remember me </label>
                            </div>
                            <a href="#!">Forgot password?</a>
                        </div>

                        <!-- Submit button -->
                        <button @click.prevent="loginHandler(this.email, this.password)" type="submit"
                            class="btn btn-outline-danger btn-sm">Sign in</button>

                        <div class="divider d-flex align-items-center my-4">
                            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                        </div>

                        <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                        </fb:login-button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>