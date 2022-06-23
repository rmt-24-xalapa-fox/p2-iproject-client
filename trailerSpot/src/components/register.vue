<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores";

export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useMainStore, ["register"]),
  },
};
</script>
<template>
  <section
    id="registerForm"
    class="bg-sky-100 text-verdana opacity-95 flex flex-col self-center justify-self-center font-verdana rounded mx-4 my-8"
  >
    <div
      class="flex flex-col align-center justify-center px-0 bold text-lg mx-9 rounded py-5"
    >
      <form action="" class="flex flex-col gap-2">
        <div>
          <label for="" class="text-blue-900 font-medium">Name:</label>
          <input v-model="name" class="py-1 px-4 w-full rounded" type="text" />
        </div>
        <div>
          <label for="" class="text-blue-900 font-medium">Email Address:</label>
          <input v-model="email" class="py-1 px-4 w-full rounded" type="text" />
        </div>
        <div>
          <label for="" class="text-blue-900 font-medium">Password:</label>
          <input
            v-model="password"
            class="py-1 px-4 w-full rounded"
            type="password"
          />
        </div>
        <div class="self-start">
          <input
            @click.prevent="register(name, email, password)"
            type="submit"
            class="rounded mt-4 py-2 cursor-pointer btn hover:bg-sky-800 bg-sky-600 text-white px-4"
            value="Register"
          />
        </div>
        <div class="text-md self-end">
          <h2>
            Have an account?
            <a
              class="text-green-700 hover:text-green-900 font-bold cursor-pointer"
              @click.prevent="this.$router.push('/login')"
              >Login</a
            >
          </h2>
        </div>
      </form>
    </div>
  </section>
</template>
