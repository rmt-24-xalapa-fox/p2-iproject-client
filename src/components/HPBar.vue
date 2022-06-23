<template>
  <div class="health-box">
    <div class="current-health" :style="{ width: `${hppercentage}%` }" >
      <!-- {{ Math.floor((mypokemon.currenthp * 100) / mypokemon.hp) }} -->
    </div>
    <div class="loss-health" :style="{ width: `${100-hppercentage}%` }" >
      <!-- {{ 100 - Math.floor((mypokemon.currenthp * 100) / mypokemon.hp) }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HPBar",
  props: ["currentHP", "maxHP"],
  computed: {
    hppercentage(){
      return Math.ceil(this.currentHP*100/this.maxHP)
    },
  },
}
</script>

<style>
.healt-bar {
  min-width: 120px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.healt-label {
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.current-health {
  height: 20px;
  background-color: red;
}

.loss-health {
  height: 20px;
  background-color: #aaa;
}

.text-health {
  color: white;
}
</style>