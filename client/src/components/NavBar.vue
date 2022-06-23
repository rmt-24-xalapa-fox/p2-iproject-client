<script>
import { mapActions, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "NavBar",
    computed: {
        ...mapWritableState(useCounterStore, ["isLogin"])
    },
    methods: {
        ...mapActions(useCounterStore, ["logoutHandler"]),
        logout() {
            this.logoutHandler()
            this.isLogin = false
        }
    }
}
</script>

<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../assets/img/Playstation_logo_colour.svg.png" alt="ps-logo" width="30" height="24"
                    class="d-inline-block align-text-top">
                PS Anywhere
            </a>
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <div v-if="isLogin" class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/home" class="nav-link">Home</router-link>
                    <router-link to="/feature" class="nav-link">Feature</router-link>
                    <!-- <router-link to="/pricing" class="nav-link">Pricing</router-link>                    -->
                </div>
            </div>
            <div v-if="isLogin" class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a @click.prevent="logout" class="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hahmlet&display=swap');

.navbar-brand {
    font-family: 'Hahmlet', serif;
    font-weight: bolder;
    color: red;
    font-size: 25px;
    margin: 0px;
}

.nav-link {
    font-size: 25px;
}

img {
    margin-top: 6px;
    height: 30px;
    width: 50px;
}
</style>