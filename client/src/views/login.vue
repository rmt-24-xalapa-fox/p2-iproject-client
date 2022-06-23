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
    ...mapActions(useIndexStore, ["loginStore", "handleCredentialResponse"]),
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
  mounted() {
    const cb = this.handleCredentialResponse;
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "657088939125-sfmqtnmb40aqva4c2iaj18qpnguktaeg.apps.googleusercontent.com",
        callback: cb,
      });
      google.accounts.id.renderButton(
        document.getElementById("google-button-login"),
        { theme: "outline", size: "large" } // customization attributes
      );
    };
  },
};
</script>

<template>
  <!-- Background image -->
  <div id="intro" class="bg-image shadow-2-strong" style="margin-top: 0px">
    <div
      class="mask d-flex align-items-center h-100"
      style="background-color: rgba(0, 0, 0, 0.2)"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-md-8">
            <form
              class="bg-white rounded-5 shadow-5-strong p-5"
              @submit.prevent="loginPage"
            >
              <!-- Email input -->
              <div class="form-outline mb-4">
                <input
                  v-model="email"
                  type="email"
                  id="form1Example1"
                  class="form-control"
                />
                <label class="form-label" for="form1Example1"
                  >Email address</label
                >
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <input
                  v-model="password"
                  type="password"
                  id="form1Example2"
                  class="form-control"
                />
                <label class="form-label" for="form1Example2">Password</label>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block">
                Sign in
              </button>
              <div>
                <p class="mt-3">
                  Dont have an account?
                  <router-link to="/register" id="loginRegister"
                    >Sign Up</router-link
                  >
                </p>
              </div>
              <div class="mt-3 justify-content-center">
                <div id="google-button-login"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Background image -->
</template>

<style scoped>
#intro {
  background-image: url(https://images.unsplash.com/photo-1581888517319-570283943d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80);
  height: 89.3vh;
}

/* Height for devices larger than 576px */
@media (min-width: 992px) {
  #intro {
    margin-top: -58.59px;
  }
}
</style>
