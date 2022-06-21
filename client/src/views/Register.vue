<script>
import axiosInstance from "../axiosInstance";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const { data } = await axiosInstance.post("/register", {
          email: this.email,
          username: this.username,
          password: this.password,
        });
        console.log(data);

        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <WelcomeNav />
  <div class="container mt-5">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-3 text-center">Register Form</h3>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="email"
              />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="username"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="password"
              />
            </div>
            <div>
              <button @click.prevent="register" class="button">register</button>
            </div>
            <div>
              <p class="text-center text-muted mb-0" style="margin-top: 15px">
                Already have an account?
                <a href="#" class="fw-bold text-body"><u>Login here</u></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* button */

.button {
  transition-duration: 0.5s;
  background-color: white;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  color: #292828;
  border-color: #292828;
}

.button:hover {
  background-color: #292828; /* Green */
  color: white;
  border: none;
}
</style>
