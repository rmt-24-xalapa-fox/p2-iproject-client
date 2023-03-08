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
              @submit.prevent="registerPage"
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

              <!-- Name input -->
              <div class="form-outline mb-4">
                <input
                  v-model="name"
                  type="text"
                  id="form1Example2"
                  class="form-control"
                />
                <label class="form-label" for="form1Example2">Full Name</label>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <input
                  v-model="password"
                  type="password"
                  id="form1Example3"
                  class="form-control"
                />
                <label class="form-label" for="form1Example3">Password</label>
              </div>

              <!-- Phone Number input -->
              <div class="form-outline mb-4">
                <input
                  v-model="phoneNumber"
                  type="text"
                  id="form1Example4"
                  class="form-control"
                />
                <label class="form-label" for="form1Example4"
                  >Phone Number</label
                >
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block">
                Sign up
              </button>
              <div>
                <p class="mt-3">
                  Already have an account?
                  <router-link to="/login" id="loginRegister"
                    >Log In</router-link
                  >
                </p>
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
