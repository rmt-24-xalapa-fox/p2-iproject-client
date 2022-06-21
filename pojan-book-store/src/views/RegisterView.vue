<script>
import { mapActions } from "pinia";
import { useStore } from "@/stores/store";
export default {
  data() {
    return {
      userObj: {
        email: "",
        password: "",
        username: "",
      },
    };
  },
  methods: {
    ...mapActions(useStore, ["moveToRoute", "registerHandler", "googleSignIn"]),
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
      <form @submit.prevent="registerHandler(userObj)" class="form-component">
        <input v-model="userObj.username" type="text" placeholder="USERNAME" />

        <input v-model="userObj.email" type="email" placeholder="EMAIL" />

        <input
          v-model="userObj.password"
          type="password"
          placeholder="PASSWORD"
        />

        <button class="btn" type="submit">REGISTER</button>

        <p class="text-after-submit">
          Sudah punya akun?
          <a @click.prevent="moveToRoute('Login')" class="link-clear" href="#"
            >Login</a
          >
        </p>
        <div id="google-sign-in"></div>
      </form>
    </div>
  </div>
</template>

<style></style>
