<script>
</script>

<template>
    <div class="full-page">

        <div>
            <div class="form-box">
                <form id="register" class="input-group-register" @submit.prevent="register">
                    <div class="register-text">REGISTER</div>
                    <input type="text" class="input-field" placeholder="username" v-model="username">
                    <!-- <p style="color: red; font-size: 10px;">Invalid Username</p> -->
                    <input type="text" class="input-field" placeholder="email" v-model="email">
                    <!-- <p style="color: red; font-size: 10px;">Invalid Username</p> -->
                    <input type="password" class="input-field" placeholder="password" v-model="password">
                    <!-- <p style="color: red; font-size: 10px;">Invalid Username</p> -->
                    <input type="text" class="input-field" placeholder="phoneNumber" v-model="phoneNumber">
                    <!-- <p style="color: red; font-size: 10px;">Invalid Username</p> -->
                    <input type="text" class="input-field" placeholder="address" v-model="address">
                    <!-- <p style="color: red; font-size: 10px;">Invalid Username</p> -->
                    <button type="submit" class="submit-btn">Register</button>
                    <div class="member-text">
                        <router-link class="link-text" to="/login">already have an account?</router-link>
                    </div>
                </form>
            </div>


        </div>
    </div>


</template>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.full-page {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("../assets/1184726.jpg");
    background-position: center;
    background-size: cover;
    position: absolute;
}

.form-box {
    width: 380px;
    height: 550px;
    position: relative;
    margin: 2% auto;
    margin-top: 100px;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    overflow: hidden;
    border-radius: 10px;

}

.input-group-register {
    top: 50px;
    position: absolute;
    width: 280px;
    transition: .5s;
}

.input-field {
    width: 100%;
    padding: 10px 0;
    margin: 5px 0;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #999;
    outline: none;
    background: transparent;
}

.submit-btn {
    width: 85%;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: #f3c693;
    border: 0;
    outline: none;
    border-radius: 30px;
    margin-top: 50px;
}

.submit-btn:hover {
    width: 85%;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: #926027;
    border: 0;
    outline: none;
    border-radius: 30px;
    margin-top: 50px;
}

.check-box {
    margin: 30px 10px 34px 0;
}

span {
    color: #777;
    font-size: 12px;
    bottom: 68px;
    position: absolute;
}





#register {
    left: 50px;
}

#register input {
    color: white;
    font-size: 15;
}


.register-text {
    color: white;
    font-family: sans-serif;
    text-align: center;
    font-size: 25px;
    margin-bottom: 30px;
}

.member-text {
    color: white;
    font-family: sans-serif;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    text-decoration: none;
}

.link-text {
    color: white;
}

.link-text:hover {
    color: #777;
}
</style>