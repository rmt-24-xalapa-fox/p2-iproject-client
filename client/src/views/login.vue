<script>
import { mapActions } from "pinia";
import { useIndexStore } from "../stores";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useIndexStore, ["loginStore"]),
    loginPage() {
      this.loginStore(this.email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          let errMsg = err.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${errMsg}`,
          });
        });
    },
  },
};
</script>

<template>
  <div class="app-login-register">
    <section class="login">
      <h3 class="middle">Login Integrasi Simaksi</h3>
      <div class="middle">
        <form @submit.prevent="loginPage">
          <div class="input">
            <label for="">Email</label>
            <input v-model="email" type="text" placeholder="Email" />
          </div>
          <div class="input">
            <label for="">Password</label>
            <input v-model="password" type="password" placeholder="Password" />
          </div>
          <div class="input">
            <div class="button">
              <button type="submit">Login</button>
            </div>
            <div>
              <p class="button">
                Dont have an account?
                <router-link to="/register" id="loginRegister"
                  >Sign Up</router-link
                >
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login {
  margin: 30px;
  width: 30%;
  height: 450px;
  background-color: rgb(255, 255, 255);
}
.login h3 {
  margin: 20px;
}
.input {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.button {
  margin-top: 10px;
}
/* global */
.app-login-register {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.middle {
  display: flex;
  justify-content: center;
}
</style>
