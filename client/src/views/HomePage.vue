<script>
export default{
    name:"HomePage",
    data(){
        return{
            access: localStorage.getItem("access_token")
        }
    }
}

</script>
<template>
    <h1>Hello World!</h1>
    <p>{{this.access}}</p>
</template>
<style></style>