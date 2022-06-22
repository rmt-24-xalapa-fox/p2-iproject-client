<script>
export default {
  name: "HomeView",
  components: {

  },
  data(){
    return {
      
    }
  },
  methods: {
    newgamehandler(){
      console.log("INIT NEW GAME");
    },


  },
  computed:{
    isLoadAvail(){
      return true
    },
  },
  created(){
    
  }
}
</script>

<template>
  <div class="home-container">
    <div class="home-menu">
      <router-link :to="{ path: '/battle' }"><span>New Game</span></router-link>
      <router-link :to="{ path: '/battle' , query: { continue: 'true' } }" v-if="isLoadAvail"><span>Continue</span></router-link>
      <router-link :to="{ path: '/statistic' }"><span>Statistic</span></router-link>
      <router-link :to="{ path: '/leaderboard' }"><span>Leaderboard</span></router-link>
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
}
</style>

<style scoped>
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