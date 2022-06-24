<script>
import { mapActions } from 'pinia'
import { useMainStore } from '../stores'
import axios from 'axios'
export default {
  name: "LeaderboardView",
  components: {

  },
  data(){
    return {
      topten: false,
    }
  },
  methods: {
    ...mapActions(useMainStore, ["getPath"]),

    async fetchTopTen(){
      try {
        page = this.$route.query.page ?? 1
        const { data: recv } = await axios.get(this.getPath(`/stats/leaderboard?page=${page}`))

        this.topten = recv
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed:{

  },
  created(){
    
  }
}
</script>

<template>
  <div v-if="!topten">
    <h1>Loading Data</h1>  
  </div>
  <div v-else>
    <div v-if="topten.length>0">

    </div>
    <div v-else>
      <h1>Be the first to reach round 20!</h1>
    </div>
  </div>
</template>

<style>

</style>