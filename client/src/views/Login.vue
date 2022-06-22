<script>
import { mapActions } from 'pinia'
import { useIndexStore } from "../stores"
import Button from "../components/Button.vue"
import axios from "axios"

export default {
    name: "login",
    components: {
        Button
    },
    data() {
        return {
            email: "",
            password: "",
            btn: "login",
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
                url: `https://cms-nurma.herokuapp.com/pub/google-sign`,
                data: {
                    credential: response.credential
                }
            })
                .then(resp => {
                    console.log(resp);
                    const { access_token, username, id, role } = resp.data.data
                    localStorage.access_token = access_token
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("UserId", id);
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
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
    <div class="container-fluid home-content px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto" id="login">
        <div class="card card0 border-0">
            <div class="row d-flex">
                <div class="col-lg-6">
                    <div class="card1 pb-5">
                        <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                            <img src="https://cdn.dribbble.com/users/1355613/screenshots/15799226/media/942dbcf92162c70a6659dc0117a8cb3f.jpg?compress=1&resize=1200x900&vertical=top"
                                class="image">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card2 card border-0 px-4 py-5">
                        <h1 class="mb-5">Login Form</h1>
                        <form @submit.prevent="login">
                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">Email Address</h6>
                                </label>
                                <input class="mb-4" type="text" v-model="email" id="email"
                                    placeholder="Enter a valid email address">
                            </div>
                            <div class="row px-3 mb-4">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">Password</h6>
                                </label>
                                <input type="password" v-model="password" id="password" placeholder="Enter password">
                            </div>
                            <Button :page="btn"></Button>
                            <div id="google-button-login" class="mb-4"></div>
                            <div class="row mb-4 px-3">
                                <small class="font-weight-bold">Don't have an account?
                                    <RouterLink to="/register" class="text-danger">Register</RouterLink>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card0 {
    box-shadow: 0px 4px 8px 0px #757575;
    border-radius: 0px;
}

.card2 {
    margin: 0px 40px;
}

.image {
    width: 560px;
    height: 400px;
}

.border-line {
    border-right: 1px solid #EEEEEE;
}

.text-sm {
    font-size: 14px !important;
}

::placeholder {
    color: #BDBDBD;
    opacity: 1;
    font-weight: 300
}

:-ms-input-placeholder {
    color: #BDBDBD;
    font-weight: 300
}

::-ms-input-placeholder {
    color: #BDBDBD;
    font-weight: 300
}

input,
textarea {
    padding: 10px 12px 10px 12px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    margin-bottom: 5px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    color: #2C3E50;
    font-size: 14px;
    letter-spacing: 1px;
}

input:focus,
textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #304FFE;
    outline-width: 0;
}

button:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline-width: 0;
}

a {
    color: inherit;
    cursor: pointer;
}

.btn-blue {
    background-color: #1A237E;
    width: 150px;
    color: #fff;
    border-radius: 2px;
}

.btn-blue:hover {
    background-color: #3d76e0;
    color: white;
    cursor: pointer;
}

.bg-blue {
    color: #fff;
    background-color: #1A237E;
}


@media screen and (max-width: 991px) {

    .image {
        width: 300px;
        height: 220px;
    }

    .border-line {
        border-right: none;
    }

    .card2 {
        border-top: 1px solid #EEEEEE !important;
        margin: 0px 15px;
    }
}
</style>