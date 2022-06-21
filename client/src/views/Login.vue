<template>
  <section>
    <div
      class="container text-center page-heading align-items-center d-flex justify-content-center bg-dark rounded"
      style="margin-top: 40px; margin-bottom: 40px; width: 30%; height: 100px"
    >
      <div class="page-title">
        <div class="row">
          <div class="col-12">
            <h3 class="text-white retrofont" style="font-size: 25px">
              GACHAMON
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container text-center page-heading align-items-center d-flex justify-content-center border border-dark border-4 rounded"
      style="width: 30%; background-color: white"
    >
      <form @submit.prevent="clickLogin">
        <div class="row" style="margin-top: 40px">
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
              Login
            </button>
          </div>
          <div class="col-4 align-items-center m-auto">
            <router-link to="/register">
              <a href="#">Sign Up !?</a>
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
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useMainStore, ["piniaLogin"]),
    clickLogin: function () {
      console.log("masok");
      this.piniaLogin(this.email, this.password);
    },
  },
};
</script>
