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
    ...mapState(useMainStore, ["runlog", "runStatus", "roundlog"]),

  },
  created(){
    
  }
}
</script>

<template>
  <div class="page-container">
    <div class="title-page">
      <h1 v-show="runStatus==='finish'">YOU LOSE</h1>
    </div>
    <!-- stat run here -->
    <div class="stat-container">
      <div v-if="roundlog.length>0" class="detail-container">
        <span class="stat-detail" style="font-weight: bold;">This Round</span>
        <span class="stat-detail" v-for="detail in roundlog">{{detail}}</span>
        <hr class="rounded" />
      </div>
      <div v-for="(log, i) in runlog" class="detail-container">
        <span class="stat-detail" style="font-weight: bold;">Round {{i+1}}</span>
        <span class="stat-detail" v-for="detail in log">{{detail}}</span>
        <hr class="rounded" />
      </div>
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
  justify-content: flex-start;
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
  width: 80%;
  max-width: 600px;
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
  justify-content: flex-start;
  overflow-y: auto;
  align-items: center;
  align-content: center;  
}

.detail-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.stat-detail {
  color: white;
  font-size: 16px;
  margin: auto 10%;
  text-align: center;
}

hr.rounded {
  margin: auto;
  width: 80%;
  border-top: 3px solid #bbb;
  border-radius: 5px;
}

</style>

<style scoped>

</style>