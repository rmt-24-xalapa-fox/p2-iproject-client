<script>
import { mapActions, mapState } from "pinia"
import { useMainStore } from "../stores"

export default {
  name: "HomeView",
  components: {

  },
  data(){
    return {
      
    }
  },
  methods: {
    ...mapActions(useMainStore, ["newgamehandler", "contgamehandler"]),


  },
  computed:{
    ...mapState(useMainStore, ["runStatus", "roundlog"]),

    isLoadAvail(){
      if(this.runStatus==='finish') return false
      return true
    },
  },
  created(){
    // check if last run
  }
}
</script>

<template>
  <div class="home-container">
    <div class="home-menu">
      <a class="home-menu-item" @click.prevent="newgamehandler" ><span>New Game</span></a>
      <a class="home-menu-item" @click.prevent="contgamehandler" v-show="isLoadAvail"><span>Continue</span></a>
      <router-link class="home-menu-item" :to="{ path: '/statistic' }" v-show="roundlog.length > 0"><span>Statistic</span></router-link>
      <router-link class="home-menu-item" :to="{ path: '/leaderboard' }"><span>Leaderboard</span></router-link>
    </div>
  </div>
</template>

<style>
.home-container {
  height: 100%;
  width: 100vw;
  min-width: 600px;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: white 10px solid;
}

.home-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 5%;
}

.home-menu-item{
  width: 100%;
  margin: 10%;
  text-align: center;
}

</style>

<style scoped>
*{
  cursor: default;
}

span {
  color: white;
  font-size: x-large;  
}

span:hover {
  animation: flicker 1.5s infinite alternate;
  color: #fff;
}

@keyframes flicker {    
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
      text-shadow:
      0 0 4px #fff,
      0 0 6px #fff,
      0 0 15px #fff,
      0 0 20px #0fa,
      0 0 25px #0fa,
      0 0 10px #0fa,
      0 0 25px #0fa,
      0 0 25px #0fa;  
  }  
  20%, 24%, 55% {        
      text-shadow: none;
  }    
}

</style>