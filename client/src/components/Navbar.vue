<script>
import { mapWritableState } from 'pinia';
import Swal from 'sweetalert2';
import { useCounterStore } from '../stores/counter';
export default {
    name: "Nabvar",
    data() {
        return {
            // logged: localStorage.getItem("access_token")
        };
    },
    computed: {
        ...mapWritableState(useCounterStore, ['isLogin'])
    },
    methods: {
        logout() {
            localStorage.clear();
            this.isLogin = false;
            Swal.fire({
                icon: "success",
                title: "You logout",
                showConfirmButton: true,
                timer: 1500,
            });
            this.$router.push("/");
        }
    }
};
</script>
<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top" style="font-size:14px;height:40px">
        <div class="container-fluid">
            <a class="navbar-brand" href="javascript:void(0)">Muvi's Store</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mynavbar">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" href="#">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cart" class="nav-link" href="#">Cart</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link" href="#" v-if="!isLogin">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-if="isLogin" @click.prevent="logout">Logout</a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link" href="#" v-if="!isLogin">Sign Up</router-link>
                    </li>
                </ul>
                <form class="d-flex" style="height:30px">
                    <input class="form-control me-2" type="text" placeholder="Search">
                    <button class="btn btn-primary" type="button">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>
<style>
</style>