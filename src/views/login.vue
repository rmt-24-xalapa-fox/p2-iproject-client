<script>
export default {
    methods: {
        barberLogin(){
            this.$router.push('/barber/login')
        },
        customerLogin(){
            this.$router.push('/customer/login')
        }
    }
}
</script>
<template>
    <div style="background-color:cornsilk; height: 100vh; padding-top: 100px;">
        <div class="card" style="margin:500px;  margin-top:0px; margin-bottom:0px; text-align:center">
            <h1 style="margin-top:20px; margin-bottom: 40px;font-family:'Courier New', Courier, monospace">LOGIN</h1>
            <button @click.prevent="barberLogin" style="width:60%; margin-left:75px;" class="btn btn-primary">as Barber</button><br> 
            <p>or</p>
            <button @click.prevent="customerLogin" style="width:60%; margin-left:75px;"  class="btn btn-primary">as Customer</button><br><br> 
            <div>
                Go to <router-link to="/register">Register Page</router-link>
            </div>
            <br>
        </div>
    </div>

</template>
<style>
</style>