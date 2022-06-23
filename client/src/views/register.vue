<script>
import { mapActions } from "pinia";
import { useIndexStore } from "../stores";
export default {
  name: "register",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      phoneNumber: "",
    };
  },
  methods: {
    ...mapActions(useIndexStore, ["registerStore"]),
    registerPage() {
      this.registerStore(this.email, this.name, this.password, this.phoneNumber)
        .then(() => {
          this.$router.push("/login");
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
    <section class="register">
      <h3 class="middle">Register Integrasi Simaksi</h3>
      <div class="middle">
        <form @submit.prevent="registerPage">
          <div class="input">
            <label for="">Email</label>
            <input v-model="email" type="text" placeholder="Email" />
          </div>
          <div class="input">
            <label for="">Name</label>
            <input v-model="name" type="text" placeholder="Name" />
          </div>
          <div class="input">
            <label for="">Password</label>
            <input v-model="password" type="password" placeholder="password" />
          </div>
          <div class="input">
            <label for="">Phone Number</label>
            <input
              v-model="phoneNumber"
              type="text"
              placeholder="Phone Number"
            />
          </div>
          <div class="input">
            <div class="button">
              <button type="submit">Register</button>
            </div>
            <p class="button">
              Have have an account?
              <router-link to="/login" href="#">Login</router-link>
            </p>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.register {
  margin: 30px;
  width: 30%;
  height: 450px;
  background-color: rgb(255, 255, 255);
}
.register h3 {
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
