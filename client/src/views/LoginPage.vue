<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        let res = await axios({
          method: "post",
          url: "http://localhost:3000/login",
          data: {
            email: this.email,
            password: this.password,
          },
        });
        localStorage.setItem("access_token", res.data.access_token);
        swal({
          text: "You are logged in",
          icon: "success",
        });
        this.$router.push("/");
      } catch (err) {
        // console.log(err);
        swal({
          text: err.response.data.message,
          icon: "error",
        });
      }
    },
  },
};
</script>

<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-[250px] w-[380px]"
          src="../assets/LOGO3.png"
          alt="logo"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="sr-only">Email</label>
            <input
              v-model="email"
              type="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email Address"
            />
          </div>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="sr-only">Password</label>
              <input
                v-model="password"
                type="password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            @click.prevent="login"
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Login
          </button>
          <button
            type="button"
            class="btn btn-primary btn-floating mx-[85px] mt-10"
            id="login-google"
          >
            <i class="fab fa-facebook-f"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
