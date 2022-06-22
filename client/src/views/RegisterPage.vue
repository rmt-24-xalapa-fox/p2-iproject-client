<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "RegisterPage",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(useCounterStore, ["registerHandler"])
    }
}
</script>

<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
            
            <div class="row d-flex align-items-center justify-content-center h-100">
                <h3>Register</h3>
                <div class="col-md-8 col-lg-7 col-xl-6">
                    <img src='../assets/img/stik ps.jpg'
                        class="img-fluid" alt="Phone image">
                </div><br>
                <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <p><strong>World no.1 easiest register. Just fill the email and password!</strong></p>
                    <form>
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input 
                            v-model="email"
                            type="email" id="form1Example13" class="form-control form-control-lg" />
                            <label class="form-label" for="form1Example13">Email address</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <input 
                            v-model="password"
                            type="password" id="form1Example23" class="form-control form-control-lg" />
                            <label class="form-label" for="form1Example23">Password</label>
                        </div>

                        <!-- <div class="d-flex justify-content-around align-items-center mb-4"> -->
                            <!-- Checkbox -->
                            <!-- <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                <label class="form-check-label" for="form1Example3"> Remember me </label>
                            </div>
                            <a href="#!">Forgot password?</a>
                        </div> -->

                        <!-- Submit button -->
                        <button @click.prevent="registerHandler(this.email, this.password)" type="submit" class="btn btn-primary btn-lg btn-block">Sign up</button>
                        <router-link class="btn btn-primary btn-lg btn-block" to="/login">Back to Login</router-link>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
h3 {
    text-align: center;
}
</style>