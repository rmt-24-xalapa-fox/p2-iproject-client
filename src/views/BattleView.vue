<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";
import axios from "axios";

import StarterCard from "../components/StarterCard.vue"
import MoveCard from "../components/MoveCard.vue";

export default {
  name: "BattleView",
  components: {
    MoveCard,
    StarterCard,
  },
  data() {
    return {
      endArea: false,
      combat: false,
      nextStop: "",
    };
  },
  methods: {
    ...mapActions(useMainStore, ["newgamehandler", "useInventItem", "combatRound", "transforms"]),
    
    initFight(pokemon){      
      this.combat=true
      this.combatRound(pokemon)
    }
  },
  computed: {
    ...mapState(useMainStore, ["inventory", "rounds", "ditto", "enemy", "enemies", "ditto", "getMaxHp", "itemlog"]),

    showNextStop() {
      if (!this.endArea) return false;
      // swap next stop
      this.nextStop = this.nextStop === "center" ? "shop" : "center";
      return this.nextStop;
    },
  },
  created() {
    if (this.$route.query.continue) {
      // fetch progress if continue
      console.log("continue");
    } else {
      // sniped to new game
      this.newgamehandler();
    }
    
  },
};
</script>

<template>
  <div class="battle-container">
    <!-- left column -->
    <!-- Starter -->
    <div class="battle-map-area-container" v-show="rounds===0 && !combat">
    <h1>SELECT ENEMY TO FIGHT</h1>
    <div class="battle-map-select-container">
      <StarterCard class="map-selector-card" v-for="pokemon in enemies" :pokemon="pokemon" :key="pokemon.id" @click="initFight(pokemon)" />
    </div>
    </div>
    <!-- transform -->
    <div class="battle-map-area-container" v-show="ditto.active<1 && combat">
    <h1>SELECT YOUR TRANSFORMATION</h1>
    <div class="battle-map-select-container">
      <StarterCard class="map-selector-card" v-for="(pokemon, i) in ditto.transforms.slice(1)" :pokemon="pokemon" :key="pokemon.id" @click="transforms(i)" />
    </div>
    </div>
    <!-- combat -->
    <div class="battle-combat-container" v-show="combat && ditto.active>0">
      <div class="battle-sprite">
        <div class="battle-sprite-ditto">
          <img src="" alt="">
        </div>
        <div class="battle-sprite-enemy">
          <img src="" alt="">
        </div>
      </div>
      <div class="battle-move-set">
        <MoveCard v-for="move in ditto.transforms[ditto.active].moves" :move="move" />
      </div>
    </div>
    <!-- select map -->
    <div class="battle-map-select-container" v-show="rounds>0 && !combat">
      <div class="map-selector-card">
        <span class="invent-item-title">Map 1</span>
        <div class="map-image-container">
          <img
            src="https://pokemongohub.net/wp-content/uploads/2019/12/jvy42zwoit741.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="map-selector-card">
        <div class="map-selector-card" v-if="showNextStop" >
        <span class="invent-item-title">PokeCenter</span>
        <div class="map-image-container">
          <img
            src="https://pokemongohub.net/wp-content/uploads/2019/12/jvy42zwoit741.jpg"
            alt=""
          />
        </div>
        </div>
      </div>
      <div class="map-selector-card">
        <span class="invent-item-title">Map 2</span>
        <img
          src="https://cdn.betterttv.net/emote/5fa84e3deca18f6455c2a71c/3x"
          alt=""
        />
      </div>
    </div>
    <!-- right column -->
    <div class="battle-info-container">
      <div class="info-my-pokemon">
        <div class="icon-sprite">
          <img
            src="https://play.pokemonshowdown.com/sprites/ani/ditto.gif"
            alt=""
          />
        </div>
        <div class="healt-bar">
          <div class="health-box">
            <div
              class="current-health"
              :style="{
                width: `${ditto.hp}%`,
              }"
            >
              <!-- {{ Math.floor((mypokemon.currenthp * 100) / mypokemon.hp) }} -->
            </div>
            <div
              class="loss-health"
              :style="{
                width:
                  `${100 - ditto.hp}%`,
              }"
            >
              <!-- {{ 100 - Math.floor((mypokemon.currenthp * 100) / mypokemon.hp) }} -->
            </div>
          </div>
          <div class="healt-label">
            <span class="text-health">Lvl: {{ ditto.level }}</span>
            <span class="text-health">HP: {{ Math.ceil(ditto.hp*getMaxHp/100) }}/ {{ getMaxHp }}</span>
          </div>
        </div>
      </div>
      <div class="invent-item-title">
        <span>Round: {{ rounds }} </span>
      </div>
      <div class="info-inventory">
        <div class="info-invent-container" v-show="inventory.Medicine.length">
          <div class="invent-item-title"><span>Consumables</span></div>
          <table class="invent-item-container">
            <tr class="invent-item-row" v-for="(invent, index) in inventory.Medicine" v-show="invent.stock>0" :key="invent.id" @click="useInventItem(invent, index)">
              <td class="invent-item-name">
                <span class="invent-item-detail">{{invent.name}}</span>
              </td>
              <td class="invent-item-val">
                <span class="invent-item-detail">{{invent.stock}}</span>
              </td>              
            </tr>
          </table>
        </div>
        <div class="info-invent-container" v-show="inventory.Utils.length">
          <div class="invent-item-title"><span>Utilities</span></div>
          <table class="invent-item-container">
            <tr class="invent-item-row" v-for="(invent, index) in inventory.Utils" v-show="invent.stock>0" :key="invent.id" @click="useInventItem(invent, index)">
              <td class="invent-item-name">
                <span class="invent-item-detail">{{invent.name}}</span>
              </td>
              <td class="invent-item-val">
                <span class="invent-item-detail">{{invent.stock}}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="info-invent-container" v-show="inventory.Berries.length">
          <div class="invent-item-title"><span>Berries</span></div>
          <table class="invent-item-container">
            <tr class="invent-item-row" v-for="(invent, index) in inventory.Berries" v-show="invent.stock>0" :key="invent.id" @click="useInventItem(invent, index)">
              <td class="invent-item-name">
                <span class="invent-item-detail">{{invent.name}}</span>
              </td>
              <td class="invent-item-val">
                <span class="invent-item-detail">{{invent.stock}}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="info-invent-container" v-show="inventory.Valuable.length">
          <div class="invent-item-title"><span>Valuable</span></div>
          <table class="invent-item-container">
            <tr class="invent-item-row" v-for="(invent, index) in inventory.Valuable" v-show="invent.stock>0" :key="invent.id">
              <td class="invent-item-name">
                <span class="invent-item-detail">{{invent.name}}</span>
              </td>
              <td class="invent-item-val">
                <span class="invent-item-detail">{{invent.stock}}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="info-invent-container">
          <div class="invent-item-title" v-show="itemlog.length">
            <span>{{itemlog}}</span>
          </div>
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
}

.battle-combat-container {
  height: 100%;
  width: 100%;
  min-width: 400px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.battle-map-area-container {
  height: 100%;
    width: 100%;
    min-width: 400px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.battle-map-area-container h1{
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

.battle-info-container {
  min-width: 200px;
  min-height: 400px;
  height: 100%;
  width: 33%;
  background-color: #424242;
}

.battle-sprite {
  min-width: 400px;
  min-height: 300px;
  height: 80%;
  width: 80%;
  /* border: #3e304a 10px solid;
  box-shadow: 0 0 0 10px #bf3d3b; */
  display: flex;
  justify-content: space-between;
}

.battle-move-set {
  min-width: 400px;
  min-height: 100px;
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: space-around;
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
  margin: 10px;
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
  width: 80%;
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

.healt-label{
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

.info-invent-container {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

.invent-item-row {
  width: 100%;
  background-color: aliceblue;
}

.invent-item-name {
  width: 80%;
}

.invent-item-val {
  width: 20%;
}

.invent-item-detail {
  color: #132435;
}

.battle-map-select-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.map-selector-card {
  width: 100%;
  height: 100%;
  min-width: 100px;
  max-width: 400px;
  border: green 5px solid;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.map-image-container {
  min-width: 100px;
  min-height: 200px;
  width: 100%;
  height: 100%;
}

.map-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.battle-sprite-enemy {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.battle-sprite-enemy img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.battle-sprite-ditto {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: flex-end;
  align-items: flex-end;
}

.battle-sprite-ditto img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

</style>

<style scoped>
span {
  font-weight: bold;
  padding: 5%;
}
</style>
