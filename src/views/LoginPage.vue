<template>
  <div class="my-16 mx-auto max-w-md">
    <div class="bg-white py-8 px-6 shadow rounded-lg">
      <h2 class="mt-4 mb-8 text-center text-3xl font-bold text-rose-600">
        Sign in
      </h2>
      <form action="" class="space-y-6" @submit.prevent="loginHandler()">
        <div>
          <label for="email" class="text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-2">
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              autofocus
              v-model="email"
            />
          </div>
        </div>

        <div>
          <label for="password" class="text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-2">
            <input
              type="password"
              id="password"
              name="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              v-model="password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Sign in
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500"> Or continue with </span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <a
          href=""
          class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
        >
          <svg fill="#5a606a" viewBox="0 0 64 64" width="24px" height="24px">
            <path
              d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26c14.359,0,26-11.641,26-26C58,17.641,46.359,6,32,6z M49.488,18.673 c2.739,3.586,4.399,8.035,4.5,12.862c-4.48-0.847-9.661-1.261-15.157-0.152c-0.656-1.523-1.345-3.041-2.086-4.547 C43.212,24.131,47.332,20.779,49.488,18.673z M46.766,15.706c-1.871,1.808-5.719,4.956-11.907,7.499 c-2.369-4.366-5.073-8.602-8.059-12.578C28.468,10.22,30.208,10,32,10C37.677,10,42.859,12.162,46.766,15.706z M22.824,12.013 c3.056,3.954,5.819,8.188,8.23,12.563c-5.393,1.703-12.17,2.839-20.502,2.548C12.079,20.4,16.694,14.839,22.824,12.013z M10,32 c0-0.3,0.011-0.599,0.023-0.896c1.112,0.046,2.208,0.076,3.271,0.076c7.911,0,14.417-1.22,19.684-2.948 c0.691,1.389,1.337,2.789,1.953,4.193c-6.267,2.099-12.812,6.412-19.101,14.473C12.214,42.976,10,37.743,10,32z M18.803,49.59 c5.859-7.593,11.865-11.596,17.655-13.475c2.097,5.409,3.593,10.831,4.384,16.024C38.134,53.332,35.144,54,32,54 C27.052,54,22.482,52.357,18.803,49.59z M44.564,50.044c-0.854-4.859-2.281-9.884-4.195-14.897c4.723-0.823,9.239-0.41,13.34,0.407 C52.733,41.535,49.338,46.71,44.564,50.044z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import axiosInstance from "../axiosInstance";
import { useMainStore } from "../stores/main";
import swal from "sweetalert";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapWritableState(useMainStore, ["isLogin"]),
  },
  methods: {
    async loginHandler() {
      try {
        const loginInput = {
          email: this.email,
          password: this.password,
        };
        let { data } = await axiosInstance.post(`/login`, loginInput);
        localStorage.setItem("access_token", data.access_token);
        this.isLogin = true;
        this.$router.push("/");
      } catch (err) {
        const errMsg = err.response.data.error.message;
        swal("Error", errMsg, "error");
      }
    },
  },
};
</script>

<style scoped></style>
