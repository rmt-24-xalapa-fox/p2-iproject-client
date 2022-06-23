<script>
import { mapActions } from 'pinia'
import { useMainStore } from '../stores'

export default {
  data() {
    return {
      email: ""
    }
  },
  name: "Login",
  methods: {
    ...mapActions(useMainStore, ["loginHandler"]),
    loginHandler() {
      this.loginHandler(this.email)
    }
  }
}
</script>

<template>
  <div class="py-6 mt-20">
    <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
      <div class="hidden lg:block lg:w-1/2 bg-cover"
        style="background-image:url('https://wallpaperaccess.com/full/3518004.jpg')">
      </div>
      <div class="w-full p-8 lg:w-1/2">
        <div id="buttonDiv" class="w-full flex justify-center" style="margin-left: 14px;"
          data-client_id="YOUR_GOOGLE_CLIENT_ID" data-login_uri="https://your.domain/your_login_endpoint"
          data-auto_prompt="false">
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-m font-semibold mb-2">Email Address</label>
          <input v-model="email"
            class=" text-gray-700 focus:outline-none focus:shadow-outline border rounded py-2 px-4 block w-full appearance-none shadow"
            type="email">
        </div>
        <div class="mt-8">
          <button @click.prevent="loginHandler"
            class="bg-gray-700 text-white font-semibold py-2 px-4 w-full rounded hover:bg-gray-600">Send Magic
            Link</button>
        </div>
      </div>
    </div>
  </div>
</template>