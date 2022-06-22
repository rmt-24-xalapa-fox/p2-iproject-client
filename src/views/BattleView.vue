<script>
import MoveCard from "../components/MoveCard.vue"

export default {
  name: "BattleView",
  components: {
    MoveCard,
  },
  data(){
    return {
      moves: [{name:'Fury Cutter', power:'3', type:'Bug'}, {name:'Wing Attack', power:'8', type:'Flying'}],
      mypokemon: {
        hp: 129,
        currenthp: 49,        
      },
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
    <!-- left column -->
    <!-- combat -->
    <!-- <div class="battle-combat-container">
      <div class="battle-sprite">

      </div>
      <div class="battle-move-set">
        <MoveCard v-for="move in moves" :move="move" />
      </div>
    </div> -->
    <!-- select map -->
    <div class="battle-map-select-container">
      <div class="map-selector-card">Map 1</div>
      <div class="map-selector-card">Map 2</div>
      <div class="map-selector-card">Map 3</div>
    </div>
    <!-- right column -->
    <div class="battle-info-container">
      <div class="info-my-pokemon">
        <div class="icon-sprite">
          <img src="https://img.pokemondb.net/sprites/sword-shield/icon/zapdos.png" alt="">
        </div>
        <div class="healt-bar">
          <div class="health-box">
            <div class="current-health" :style="{'width': Math.floor(mypokemon.currenthp*100/mypokemon.hp) }" >{{Math.floor(mypokemon.currenthp*100/mypokemon.hp)}}</div>
            <div class="loss-health" :style="{'width': 100-Math.floor(mypokemon.currenthp*100/mypokemon.hp) }" >{{100-Math.floor(mypokemon.currenthp*100/mypokemon.hp)}}</div>
          </div>
          <span class="text-health">HP: {{mypokemon.currenthp}}/{{mypokemon.hp}}</span>
        </div>
      </div>
      <div class="info-inventory">
        <div class="info-invent-container">
          <div class="invent-item-title"><span>Consumables</span></div>
          <table class="invent-item-container">
            <tr class="invent-item-row">
              <td class="invent-item-name">
                <span class="invent-item-detail">Potion</span>
              </td>
              <td class="invent-item-val">
                <span class="invent-item-detail">x5</span>
              </td>
            </tr>
            <tr class="invent-item-row">
              <td class="invent-item-name">
                <span class="invent-item-detail">Super Potion</span>
              </td>
              <td class="invent-item-val">
                <span class="invent-item-detail">x1</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="info-invent-container">
          <div class="invent-item-title"><span>TM Moves</span></div>          
          <table class="invent-item-container">
            <tr class="invent-item-row">
              <td class="invent-item-val">
                <span class="invent-item-detail">Normal</span>
              </td>
              <td class="invent-item-name">
                <span class="invent-item-detail">Quick Attack</span>
              </td>
            </tr>
            <tr class="invent-item-row">
              <td class="invent-item-val">
                <span class="invent-item-detail">Fire</span>
              </td>
              <td class="invent-item-name">
                <span class="invent-item-detail">Ember</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
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

.info-my-pokemon {
  min-width: 200px;
  min-height: 100px;
  height: 20%;
  width: 100%;
  display: flex;  
  justify-content: center;
  align-items: center;
  align-content: center;
}

.info-inventory {
  min-width: 200px;
  min-height: 300px;
  height: 80%;
  width: 95%;
  display: flex;  
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  margin: auto;
}

.icon-sprite {
  width: 20%;  
}

.icon-sprite img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.health-box {
  display: flex;
  min-width: 120px;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.healt-bar {  
  min-width: 120px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
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

.info-invent-container {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 0 0 2px 2px aquamarine;
}

.invent-item-container {  
  background-color: transparent;
}

.invent-item-title {
  width: 100%;
  padding: 5px;
  color: #bbc;
  background-color: #112233;  
}

.invent-item-container {
  width: 100%;
}

.invent-item-row{
  width: 100%;
  background-color: aliceblue;
}

.invent-item-name {
  width: 80%;  
}

.invent-item-val {
  width: 20%;
}

.invent-item-detail{
  color: #132435;
}

.battle-map-select-container {
  height: 100%;
  width: 100%;
  min-width: 400px;
  min-height: 400px;
  border: red 5px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

</style>

<style scoped>
span {
  font-weight: bold;
  margin-left: 5%;  
}
</style>