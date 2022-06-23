<script>
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '../stores';
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    ...mapActions(useMainStore, ["logout", "getMovies"])
  },
  computed: {
    ...mapState(useMainStore, ["loggedIn"]),
  },
};
</script>

<template>
  <section
    id="navbar"
    class="text-stone-400 md:text-l font-semibold text-sm absolute w-[100%] opacity-95 space-between bg-blue-900 shadow-xl md:text-xl flex flex-row justify-center align-center"
  >
    <ul class="flex gap-10 grow py-4 h-full justify-between mx-5">
      <li>
        <ul class="flex flex-row gap-10">
          <li>
            <router-link class="cursor-pointer hover:text-stone-500" to="/">
              Trailer Spot
            </router-link>
          </li>
        </ul>
      </li>
      <li class="flex gap-10 flex-row">
      <form  v-if="loggedIn" @submit.prevent="getMovies(1, '', name)"> <input  class="rounded pl-2" type="text" v-model="name" placeholder="Search"> </form>
         <li>
            <router-link v-if= "!loggedIn" class="pr-4 cursor-pointer hover:text-stone-500" to="/login">
              Login
            </router-link>
            <a @click.prevent ="logout" v-if= "loggedIn" class="cursor-pointer hover:text-stone-500" to="/login">
              Logout
            </a>

          </li>
      </li>
    </ul>
  </section>
</template>
