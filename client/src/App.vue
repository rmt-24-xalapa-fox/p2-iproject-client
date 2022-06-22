<script>
import { mapActions } from "pinia"
import { useIndexStore } from "./stores"
export default {
  created: function () {
    if (localStorage.getItem("access_token")) {
      this.setIsLogin(true)
    }
  },
  methods: {
    ...mapActions(useIndexStore, ["setIsLogin"])
  }
}
</script>

<template>
  <RouterView />

</template>

<style>
</style>
