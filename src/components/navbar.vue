<script>
export default {
    methods: {
        logout(){
            localStorage.clear()
            this.$router.push('/login')
        }
    },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-0" style="display:flex;" >
        <span class="navbar-brand mb-0 h1" style="margin-left:30px">
            <img src="../assets/logo.png" class="d-inline-block align-top" width="30" height="30" >
            ComfyCut
        </span>
        <div class="collapse navbar-collapse container" id="navbarNav" style="padding:0px">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/customer/home" class="nav-link active" style="color:rgba(255, 255, 255, 0.679)">Barbers</router-link> 
                </li>
                <li class="nav-item active">
                    <router-link to="/customer/favorites" class="nav-link active" style="color:rgba(255, 255, 255, 0.679)">Favorites</router-link>
                </li>
                <li class="nav-item active">
                    <router-link to="/customer/requests" class="nav-link active" style="color:rgba(255, 255, 255, 0.679)">Bookings</router-link>
                </li>
                <li class="nav-item active">
                    <router-link to="/customer/search" class="nav-link active" style="color:rgba(255, 255, 255, 0.679)">Search</router-link>
                </li>
                <li class="nav-item active" style="margin-left:200%; ">
                    <button v-on:click="logout" class="nav-link active" style="color:black; border-radius: 10px;">Logout</button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style>
</style>