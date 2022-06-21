<script>
import { mapActions } from "pinia";
import { useStore } from "@/stores/store";
export default {
  data() {
    return {
      userObj: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useStore, ["moveToRoute", "loginHandler", "googleSignIn"]),
  },
  mounted() {
    this.googleSignIn();
  },
};
</script>

<template>
  <div class="register-container">
    <h1>Pojan Book Store</h1>
    <div class="form-container">
      <!-- <p class="form-title">Login</p> -->
      <form @submit.prevent="loginHandler(userObj)" class="form-component">
        <input v-model="userObj.email" type="email" placeholder="EMAIL" />

        <input
          v-model="userObj.password"
          type="password"
          placeholder="PASSWORD"
        />

        <button class="btn" type="submit">LOGIN</button>

        <p class="text-after-submit">
          Belum punya akun?
          <a
            @click.prevent="moveToRoute('Register')"
            class="link-clear"
            href="#"
            >Register</a
          >
        </p>
        <div id="google-sign-in"></div>
      </form>
    </div>
  </div>
</template>

<style></style>
