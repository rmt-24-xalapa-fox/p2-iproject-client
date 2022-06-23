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
                    <router-link to="/barber/home" class="nav-link active" style="color:rgba(255, 255, 255, 0.679)">Home</router-link> 
                </li>
                <li class="nav-item active">
                    <router-link to="/barber/transactions" class="nav-link active" style="color:rgba(255, 255, 255, 0.679)">Notifications</router-link>
                </li>
                <li class="nav-item active" style="margin-left:400%; ">
                    <button v-on:click="logout" class="nav-link active" style="color:black; border-radius: 10px;">Logout</button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style>
</style>