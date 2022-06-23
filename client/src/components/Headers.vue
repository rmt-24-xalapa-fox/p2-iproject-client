<script>
export default {
  name: "HeadersTop",
};
</script>

<template>
  <div>
    <nav class="lg:block bg-gray-900 bg-opacity-70 z-10 items-center pt-2">
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
        <li>
          <router-link
            to="/popularmovies"
            class="font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Popular Movie
          </router-link>
        </li>
        <li class="flex-1">
          <router-link
            to="/series"
            class="font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Movie Series
          </router-link>
        </li>
        <li>
          <router-link
            to="/login"
            class="font-bold text-sm lg:text-base text-white hover:text-app-green-1 transition ease-in-out duration-300"
          >
            Login
          </router-link>
        </li>
        <li class="mr-10">
          <router-link
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
