<script>
import { mapActions } from "pinia"
import { useIndexStore } from "./stores"
export default {
  created: function () {
    if (localStorage.getItem("access_token")) {
      this.setIsLogin(true)
      this.readCart()
    }
  },
  methods: {
    ...mapActions(useIndexStore, ["setIsLogin", "readCart"])
  }
}
</script>

<template>
  <RouterView />

</template>

<style>
</style>
