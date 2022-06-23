<script>
export default {
    methods: {
        registerBarber(){
            this.$router.push('/barber/register')
        },
        registerCustomer(){
            this.$router.push('/customer/register')
        }
    }
}
</script>
<template>
    <div style="background-color:cornsilk; height: 100vh; padding-top: 100px;">
        <div class="card" style="margin:500px;  margin-top:0px; margin-bottom:0px; text-align:center">
            <h1 style="margin-top:20px; margin-bottom: 40px;font-family:'Courier New', Courier, monospace">REGISTER</h1>
            <button @click.prevent="registerBarber" style="width:60%; margin-left:75px;" class="btn btn-primary">as Barber</button><br> 
            <p>or</p>
            <button @click.prevent="registerCustomer" style="width:60%; margin-left:75px;"  class="btn btn-primary">as Customer</button><br><br> 
            <br>
        </div>
    </div>
</template>
<style>
</style>
