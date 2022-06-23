<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useMainStore, ["login"]),
  },
};
</script>

<template>
  <section
    id="loginForm"
    class="bg-blue-800 text-verdana opacity-95 flex flex-col self-center justify-self-center font-verdana rounded mx-4 my-8"
  >
    <div>
      <div
        class="flex flex-col align-center justify-center px-5 bold text-lg mx-9 rounded py-5"
      >
        <form action="" class="flex flex-col">
          <div>
            <label for="" class="text-fuchsia-100 font-medium"
              >Enter your email:</label
            >
            <input
              class="py-1 px-4 w-full rounded"
              type="text"
              v-model="email"
            />
          </div>
          <div>
            <label for="" class="text-fuchsia-100 font-medium"
              >Enter your password:</label
            >
            <input
              class="py-1 px-4 w-full rounded"
              v-model="password"
              type="password"
            />
          </div>
          <div class="flex gap-2 flex-row items-center justify-between">
            <div class="self-start">
              <input
                @click.prevent="login(email, password)"
                type="submit"
                class="rounded mt-4 py-2 cursor-pointer btn hover:bg-sky-100 bg-sky-100 text-blue-800 px-4"
                value="Login"
              />
            </div>
          </div>
          <div class="text-md self-end text-blue-100">
            <h2>
              New here?
              <a
                class="text-indigo-200 text-shadow hover:text-indigo-400 font-bold cursor-pointer"
                @click.prevent="this.$router.push('/register')"
                >Register</a
              >
            </h2>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
