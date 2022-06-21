<template>
  <div class="form my-4 mx-5 login-pagec">
    <div class="container">
      <div class="row allog">
        <div class="col-md-4">
          <div>
            <img
              id="imgidl"
              src="https://i.pinimg.com/564x/08/9e/79/089e79c49385af1058a5362c6304f1d5.jpg"
              class=""
              alt="gambar"
            />
          </div>
        </div>
        <div class="col-md-6 kanan1r">
          <div class="px-5 pt-5 mt-5">
            <form id="form-loginc">
              <div class="form-row mt-3">
                <h3>Sign into your account</h3>
                <div class="col-lg-8 mt-3">
                  <input
                    type="email"
                    id="emaillc"
                    class="form-control"
                    placeholder="Email Address"
                    v-model="dataLogin.email"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-8 mt-3">
                  <input
                    type="password"
                    id="passwordlc"
                    class="form-control"
                    placeholder="Password"
                    v-model="dataLogin.password"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="mt-3">
                  <button
                    @click.prevent="postLogin"
                    type="submit"
                    class="btn btn-dark"
                  >
                    Sign In
                  </button>
                </div>
                <p class="mt-2">
                  Don't Have Account?
                  <router-link to="/register">Sign Up here</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  name: `LoginPage`,
  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser"]),
    async postLogin() {
      try {
        await this.loginUser(this.dataLogin);
        this.$router.push("/");
        this.$swal.fire({
          icon: "success",
          title: `Success - 200`,
          text: `Success Login`,
          timer: 1000,
        });
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      } finally {
        (this.dataLogin.email = ""), (this.dataLogin.password = "");
      }
    },
  },
};
</script>

<style>
.kanan1r {
  box-shadow: 12px 8px 15px grey;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #f7faff;
}
#imgidr {
  box-shadow: 2px 5px 5px grey;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.allog {
  margin-left: 10vw;
}
</style>
