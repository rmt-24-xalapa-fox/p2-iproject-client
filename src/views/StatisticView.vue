<script>
import { mapState } from 'pinia'
import { useMainStore } from '../stores'

export default {
  name: "StatisticView",
  components: {

  },
  data(){
    return {
      
    }
  },
  methods: {

  },
  computed:{
    ...mapState(useMainStore, ["runlog"]),

  },
  created(){
    
  }
}
</script>

<template>
  <div class="page-container">
    <div class="title-page">
      <h1>YOU LOSE</h1>
    </div>
    <!-- stat run here -->
    <div class="stat-container">
      <span v-for="log in runlog">{{log}}</span>
    </div>
  </div>
</template>

<style>
.page-container {
  height: 100%;
  width: 100vw;
  min-width: 600px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.title-page {
  height: 20%;
  -webkit-text-stroke: 1px #3556a2;
  -webkit-text-fill-color: yellow;
  text-shadow:
    3px 3px 0 #3556a2,
    -1px -1px 0 #3556a2,  
    1px -1px 0 #3556a2,
    -1px 1px 0 #3556a2,
    1px 1px 0 #3556a2;
  color: yellow;
  font-weight: bold;
  text-align: center;
}

.stat-container {
  min-width: 200px;
  min-height: 100px;
  height: 80%;
  width: fit-content;
  background-color: #2f4e62;
  border: white 5px solid;  
  border-radius: 10%;
  -moz-border-radius: 10%; 
  -webkit-border-radius: 10%;  
  -webkit-box-shadow: 0px 0px 0px 10px #c6a74a;
  -moz-box-shadow: 0px 0px 0px 10px #c6a74a;
  box-shadow: 0px 0px 0px 10px #c6a74a;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;  
}

</style>

<style scoped>
span {
  color: white;
  font-size: 16px;
  margin: auto 10%;
  text-align: center;
}
</style>