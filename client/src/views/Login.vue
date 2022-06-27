<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: ''
        };
    },

    methods: {
        ...mapActions(useCounterStore, ['login'])
    }
};
</script>

<template>
    <div style="
      background-image: url('https://i.insider.com/5f1f12a82618b9420626bb06?width=1136&format=jpeg');
      height: 100vh;
      width: 100vw;
      background-size: cover;
      background-repeat: no-repeat;
    ">
        <div class="row h-100">
            <div class="col-4"></div>
            <div class="col-4 d-flex align-items-center justify-content-center">
                <div class="card py-3 w-50 my-auto" style="background-color: #b9b5b5da">
                    <form class="px-4">
                        <h1 class="text-center font-monospace">LOGIN</h1>
                        <div class="mb-3">
                            <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" v-model="email" id="exampleDropdownFormEmail1"
                                placeholder="email" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="password"
                                id="exampleDropdownFormPassword1" placeholder="Password" />
                        </div>
                        <div class="mb-3"></div>
                        <button type="submit" @click.prevent="login(email, password)" class="btn btn-success">Sign
                            in</button>
                    </form>
                    <div class="dropdown-divider"></div>
                    <router-link to="/register" class="dropdown-item" href="#">Create Account? Sign up</router-link>
                </div>
            </div>
            <div class="col-4"></div>
        </div>
    </div>

</template>