<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import router from '../router';
import { useMainStore } from '../stores';
export default {
  data() {
    return {
      searchQuery : "",
    };
  },
  methods: {
    ...mapActions(useMainStore, ["logout", "getMovies"]),
    goToHome(){
      this.activePage=1;
      this.query = "";
      this.getMovies(1, false, "")
      router.push("/")
    }
  },
  computed: {
    ...mapState(useMainStore, ["loggedIn"]),
    ...mapWritableState(useMainStore, ["activePage, query"])
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
          <li  @click.prevent="goToHome">
            <a class="cursor-pointer hover:text-stone-500" >
              Trailer Spot
            </a>
          </li>
        </ul>
      </li>
      <li class="flex gap-10 flex-row">
      <form  v-if="loggedIn" @submit.prevent="getMovies(1,false,searchQuery)"> <input  class="rounded pl-2" type="text" v-model="searchQuery" placeholder="Search"> </form>
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
