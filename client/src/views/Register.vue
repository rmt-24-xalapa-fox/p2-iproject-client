<template>
  <section>
    <div
      class="container text-center page-heading align-items-center d-flex justify-content-center bg-dark rounded"
      style="margin-top: 250px; margin-bottom: 40px; width: 30%; height: 100px"
    >
      <div class="page-title">
        <div class="row">
          <div class="col-12">
            <h3 class="text-white retrofont" style="font-size: 25px">
              REGISTER
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container text-center page-heading align-items-center d-flex justify-content-center border border-dark border-4 rounded"
      style="width: 30%; background-color: white"
    >
      <form @submit.prevent="clickRegister">
        <div class="row" style="margin-top: 40px">
          <div class="col-4">
            <label>Username :</label>
          </div>
          <div class="col-4">
            <input v-model="username" type="text" />
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>Email :</label>
          </div>
          <div class="col-4">
            <input v-model="email" type="text" />
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label>Password :</label>
          </div>
          <div class="col-4">
            <input v-model="password" type="password" />
          </div>
        </div>
        <div class="row"></div>
        <div class="row" style="margin-top: 30px; margin-bottom: 30px">
          <div class="col-4"></div>
          <div class="col-4">
            <button
              class="btn btn-dark m-auto"
              style="width: 100%; margin-bottom: 30px"
            >
              Register
            </button>
          </div>
          <div class="col-4 align-items-center m-auto">
            <router-link to="/login">
              <a href="#">Login !?</a>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useMainStore, ["piniaRegister"]),
    clickRegister: function () {
      let referral = this.$route.query.referral;
      this.piniaRegister(this.username, this.email, this.password, referral);
    },
  },
};
</script>
