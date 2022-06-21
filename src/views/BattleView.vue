<script>
import MoveCard from "../components/MoveCard.vue"

export default {
  name: "BattleView",
  components: {
    MoveCard,
  },
  data(){
    return {
      moves: [{name:'Fury Cutter', power:'3', type:'Bug'}, {name:'Wing Attack', power:'8', type:'Flying'}]
    }
  },
  methods: {

  },
  computed:{

  },
  created(){
    
  }
}
</script>

<template>
  <div class="battle-container">
    <div class="battle-combat-container">
      <div class="battle-sprite">

      </div>
      <div class="battle-move-set">
        <MoveCard v-for="move in moves" :move="move" />
      </div>
    </div>
    <div class="battle-info-container">

    </div>
  </div>
</template>

<style>
.battle-container {
  height: 100%;
  width: 100vw;
  min-width: 600px;
  min-height: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  align-content: center;
  border: yellow 10px solid;
}

.battle-combat-container {
  height: 100%;
  width: 100%;
  min-width: 400px;
  min-height: 400px;
  border: red 5px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.battle-info-container {
  min-width: 200px;
  min-height: 400px;
  height: 100%;
  width: 33%;
  border: blue 5px solid;
}

.battle-sprite {
  min-width: 400px;
  min-height: 300px;
  height: 80%;
  width: 100%;
  border: blue 3px dashed;
}

.battle-move-set {
  min-width: 400px;
  min-height: 100px;
  height: 20%;
  width: 100%;
  border: yellow 3px dashed;
  display: flex;  
  justify-content: center;
  align-items: center;
  align-content: center;
}

</style>