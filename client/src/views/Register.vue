<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const register = await axios.post("http://localhost:3000/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.$router.push("/login");
      } catch (err) {
        swal(err.response.data.message);
      }
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
<template>
  <div class="container-fluid d-flex vh-100 bg-light" style="background-position: center">
    <div class="row align-items-center mx-auto">
      <div class="col">
        <div>
          <h1 class="text-center mb-3">Sign up</h1>
        </div>
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" />
          </div>
          <div class="mb-4">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
          </div>
          <div class="d-grid gap-3">
            <button class="btn btn-light text-light" style="background-color: #4D9C81;" type="button" @click.prevent="register">SIGN UP</button>
            <button class="btn btn-dark text-light" type="button" @click.prevent="login">SIGN IN</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style></style>
