<script >
import Navbar from './components/Navbar.vue'
export default {
  name: "app",
  components: {
    Navbar
  }
}
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
</style>
