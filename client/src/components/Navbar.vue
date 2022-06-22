<script>
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '../stores/main'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Cart from './Cart.vue'
export default {
    computed: {
        ...mapState(useMainStore, ["hasLoggedIn"])
    },
    methods: {
        ...mapActions(useMainStore, ["setHasLoggedIn"]),
        logout: function () {
            localStorage.clear();
            this.$router.push("/");
            this.setHasLoggedIn(false);
        }
    },
    components: { Login, Register, Cart }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <div class="container">
            <router-link to="/" class="navbar-brand" style="font-family: 'Comfortaa', 'cursive'">
                <img src="http://cdn.onlinewebfonts.com/svg/img_396480.png" width="50" height="50" alt="" />
                Alia <small>Beauty Store</small>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/wishlist" class="nav-link active" aria-current="page"><img
                                src="http://cdn.onlinewebfonts.com/svg/img_315681.png" width="50" height="50"
                                alt="" /></router-link>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn nav-link active" aria-current="page" data-bs-toggle="modal"
                                    data-bs-target="#cartModal">
                            <img src="http://cdn.onlinewebfonts.com/svg/img_527837.png" width="50" height="50" alt="" />
                        </button>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link active dropdown-toggle" data-bs-toggle="dropdown"
                            aria-current="page"><img src="http://cdn.onlinewebfonts.com/svg/img_337531.png" width="50"
                                height="50" alt="" /></a>
                        <ul class="dropdown-menu">
                            <li v-if="!hasLoggedIn">
                                <button type="button" class="btn btn-primary dropdown-item" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    Login
                                </button>
                            </li>
                            <li v-if="!hasLoggedIn">
                                <button type="button" class="btn btn-primary dropdown-item" data-bs-toggle="modal"
                                    data-bs-target="#registerModal">
                                    Register
                                </button>
                            </li>
                            <li v-if="hasLoggedIn">
                                <router-link to="/logout" class="dropdown-item" @click.prevent="logout">Sign Out
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <Login />
    </div>
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <Register />
    </div>
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <Cart />
    </div>
</template>