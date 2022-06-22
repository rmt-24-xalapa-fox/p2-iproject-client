<script>
import { mapActions } from 'pinia'
import { useIndexStore } from "../stores"
import axios from "axios"

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        ...mapActions(useIndexStore, ["isLogin", "setIsLogin"]),
        login: function () {
            this.isLogin(this.email, this.password)
                .then(() => { })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Invalid Username & Password!`,
                    });
                })
        },

        handleCredentialResponse(response) {
            axios({
                method: 'POST',
                url: `http://localhost:3001/google-sign`,
                data: {
                    credential: response.credential
                }
            })
                .then(resp => {
                    console.log(resp);
                    const { access_token, id } = resp.data.data
                    localStorage.access_token = access_token
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("UserId", id);
                    this.setIsLogin(true)
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err)
                })
        },

    },
    mounted() {
        const cb = this.handleCredentialResponse
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "769675518154-2l3kf8uclg9uphp4if2kolj9h3bn5u3t.apps.googleusercontent.com",
                callback: cb
            });
            google.accounts.id.renderButton(
                document.getElementById("google-button-login"),
                { theme: "outline", size: "large" }  // customization attributes
            );
        }
    }
}
</script>

<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6 login-section-wrapper">
                    <div class="brand-wrapper">
                        <img src="../assets/images/logo.png" alt="logo" class="logo">
                    </div>
                    <div class="login-wrapper my-auto">
                        <h1 class="login-title">Log in</h1>
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="email" id="email" class="form-control"
                                    placeholder="email@example.com">
                            </div>
                            <div class="form-group mb-4">
                                <label for="password">Password</label>
                                <input type="password" v-model="password" id="password" class="form-control"
                                    placeholder="enter your passsword">
                            </div>
                            <input name="login" id="login" class="btn btn-block login-btn" type="submit" value="Login">
                        </form>
                        <p class="login-wrapper-footer-text">Don't have an account? <RouterLink to="/register"
                                class="text-reset">Register here</RouterLink>
                        </p>
                    </div>
                </div>
                <div class="col-sm-6 px-0 d-none d-sm-block">
                    <img src="../assets/images/login.jpg" alt="login image" class="login-img">
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>

main {
    background-color: #ebebeb;
}

.brand-wrapper {
    padding-top: 7px;
    padding-bottom: 8px;
}

.brand-wrapper .logo {
    height: 25px;
}

.login-section-wrapper {
    height: 100vh;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding: 68px 100px;
    
}

@media (max-width: 991px) {
    .login-section-wrapper {
        padding-left: 50px;
        padding-right: 50px;
    }
}

@media (max-width: 575px) {
    .login-section-wrapper {
        padding-top: 20px;
        padding-bottom: 20px;
        min-height: 100vh;
    }
}

.login-wrapper {
    width: 300px;
    max-width: 100%;
    padding-top: 24px;
    padding-bottom: 24px;
}

@media (max-width: 575px) {
    .login-wrapper {
        width: 100%;
    }
}

.login-wrapper label {
    font-size: 14px;
    font-weight: bold;
    color: #b0adad;
}

.login-wrapper .form-control {
    border: none;
    border-bottom: 1px solid #e7e7e7;
    border-radius: 0;
    padding: 9px 5px;
    min-height: 40px;
    font-size: 18px;
    font-weight: normal;
}

.login-wrapper .form-control::-webkit-input-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control::-moz-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control:-ms-input-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control::-ms-input-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control::placeholder {
    color: #b0adad;
}

.login-wrapper .login-btn {
    padding: 13px 20px;
    background-color: #fdbb28;
    border-radius: 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 14px;
}

.login-wrapper .login-btn:hover {
    border: 1px solid #fdbb28;
    background-color: #fff;
    color: #fdbb28;
}

.login-wrapper a.forgot-password-link {
    color: #080808;
    font-size: 14px;
    text-decoration: underline;
    display: inline-block;
    margin-bottom: 54px;
}

@media (max-width: 575px) {
    .login-wrapper a.forgot-password-link {
        margin-bottom: 16px;
    }
}

.login-wrapper-footer-text {
    font-size: 16px;
    color: #000;
    margin-bottom: 0;
}

.login-title {
    font-size: 30px;
    color: #000;
    font-weight: bold;
    margin-bottom: 25px;
}

.login-img {
    width: 100%;
    height: 100vh;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: left;
    object-position: left;
}

</style>