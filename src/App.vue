<script>
import { RouterView } from "vue-router"
import { mapActions, mapState, mapWritableState } from 'pinia'
import navbar from "./components/navbar.vue";
import { useReportStore } from "./stores/report";

export default {
  components: {
    RouterView,
    navbar
  },
  methods: {
    ...mapActions(useReportStore,[`fetchData`]),
  },
  computed:{
    ...mapWritableState(useReportStore,[`isLogin`])
  },
  created() {
    console.log('created')
    this.fetchData()

    if (localStorage.getItem('access_token')) {
      console.log(`ada acc token`)
      this.isLogin = true
    }
  }
}
</script>

<template>
  <navbar />
  <RouterView />
</template>

<style>
</style>
