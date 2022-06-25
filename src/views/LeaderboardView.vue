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
        const page = this.$route.query.page ?? 1
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
    this.fetchTopTen()
  }
}
</script>

<template>
<div class="page-container">
  <div v-if="!topten" class="stat-container">
    <div class="title-page">
      <h1>Loading Data</h1>  
    </div>
  </div>
  <div v-else class="stat-container">
    <div v-if="topten.length>0" v-for="(row, i) in topten" class="detail-container">
      <span class="stat-detail" >{{row.User.username}}</span>
      <span class="stat-detail" >{{row.rounds}} Rounds</span>
      <span class="stat-detail" >Level {{row.level}}</span>
      <span class="stat-detail" >{{row.createdAt}}</span>
      <hr class="rounded" />
    </div>    
    <div class="title-page" v-else>
      <h1>Be the first to reach round 20!</h1>
    </div>
  </div>

</div>
</template>

<style>

</style>