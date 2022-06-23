<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "HeadersTop",
  computed: {
    ...mapState(useCounterStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["setLogin"]),
    logoutHandler() {
      localStorage.clear();
      this.setLogin(false);
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.setLogin(true);
    }
  },
};
</script>

<template>
  <div>
    <nav class="lg:block bg-gray-900 bg-opacity-70 z-10 items-center pt-2 px-4">
      <ul class="flex space-x-5 lg:space-x-8 items-center">
        <li class="font-bold text-3xl text-red-600">DHaflaFlix</li>

        <li>
          <router-link
            to="/"
            class="font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Home
          </router-link>
        </li>
        <li class="flex-1">
          <router-link
            to="/movies"
            class="font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Popular Movie
          </router-link>
        </li>
        <li class="mr-10" v-if="isLogin === false">
          <router-link
            to="/login"
            class="font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Login
          </router-link>
        </li>
        <li class="mr-30" v-if="isLogin === true">
          <router-link
            to="/transaction"
            class="mr-10 font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Transaction History
          </router-link>
        </li>
        <li class="mr-30" v-if="isLogin === true">
          <router-link
            @click="logoutHandler"
            to="/"
            class="mr-10 font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Logout
          </router-link>
        </li>
      </ul>
      <ul class="flex space-x-5 lg:space-x-8 items-left p-4"></ul>
    </nav>
  </div>
</template>
