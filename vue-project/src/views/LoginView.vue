<script>
import { mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
import { RouterLink } from "vue-router";

export default {
  name: "loginview",
  components: {
    RouterLink,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useCounterStore, ["googleSign", "loginHandler"]),
    async callback(response) {
      console.log(response.credential);
      let res = await this.googleSign(response.credential);
      if (res) {
        this.$router.push("/");
        this.$swal({
          icon: "success",
          text: "your wellcome",
        });
      }
    },
    async login() {
      let response = await this.loginHandler(this.email, this.password);
      if (response) {
        this.$router.push("/");
        this.$swal({
          icon: "success",
          text: "your wellcome",
        });
      } else {
        this.$swal({
          icon: "error",
          text: "invalid password/email",
        });
      }
    },
  },
};
</script>

<template>
  <div
    class="d-flex rounded shadow"
    style="
      background-color: #c2ded1;
      width: 60%;
      margin: auto;
      margin-top: 5%;
      box-sizing: border-box;
      overflow: hidden;
    "
  >
    <div class="col-6">
      <img
        src="../assets/mohd-nasiruddin-mohd-nasir-OYKbD7Jw3AU-unsplash.jpg"
        alt=""
        style="width: 100%; height: 100%"
      />
    </div>
    <div style="margin: auto">
      <div id="form-login" style="text-align: center">
        <div>
          <img
            src="../assets/TRAVEL_TOURISM_LOGO-02-removebg-preview.png"
            alt=""
            style="width: 100px; height: 100px"
          />
        </div>
        <form action="#" class="signin-form" @submit.prevent="login">
          <div class="form-group mt-3">
            <label class="form-control-placeholder" for="email">Email</label>
            <input type="text" class="form-control" required v-model="email" />
          </div>
          <div class="form-group">
            <label class="form-control-placeholder" for="password"
              >Password</label
            >
            <input
              id="password-field"
              type="password"
              class="form-control"
              required
              v-model="password"
            />
            <span
              toggle="#password-field"
              class="fa fa-fw fa-eye field-icon toggle-password"
            ></span>
          </div>
          <div class="form-group mt-2">
            <button
              type="submit"
              class="form-control btn btn-primary rounded submit px-3"
            >
              Sign In
            </button>
          </div>
          <div class="form-group d-md-flex">
            <p>Don't have account yet ?</p>
            <RouterLink to="/register" href=""> sign-up here</RouterLink>
          </div>
        </form>
        <div style="text-align: center">
          <p>or sign-up using</p>
        </div>
        <GoogleLogin :callback="callback" prompt auto-login></GoogleLogin>
      </div>
    </div>
  </div>
</template>

<style></style>
