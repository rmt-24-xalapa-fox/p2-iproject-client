<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";
import axios from "axios";

import StarterCard from "../components/StarterCard.vue";
import MoveCard from "../components/MoveCard.vue";
import HPBar from "../components/HPBar.vue";

export default {
  name: "BattleView",
  components: {
    MoveCard,
    StarterCard,
    HPBar,
},
  data() {
    return {
      counter: 0,
      nextStop: "",
      dittoimg:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png",
      enemyimg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png",
      // shinyRates: 1 / 4096,
      shinyRates: 1 / 322,
      skip: true,
    };
  },
  methods: {
    ...mapActions(useMainStore, [
      "newgamehandler",
      "useInventItem",
      "enemySelected",
      "initFight",
      "setTypes",
      "discardTransform",
    ]),

    async fetchsrpiteimgNType() {
      try {
        const { data: recv } = await axios.request({
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/" + this.enemy.id,
        });
        // console.log(recv.sprites);
        if (this.isShiny) {
          this.enemyimg = recv.sprites.front_shiny;
        } else {
          this.enemyimg = recv.sprites.front_default;
        }

        const { data: recv_ditto } = await axios.request({
          method: "GET",
          url:
            "https://pokeapi.co/api/v2/pokemon/" +
            this.ditto.transforms[this.ditto.active].id,
        });

        this.dittoimg = recv_ditto.sprites.back_default;

        // let dittotype = recv_ditto.types[0].type.name;
        // let enemytype = recv.types[0].type.name;

        let dittotype = recv_ditto.types.map( p => {
          let name = p.type.name
          return name.replace(name[0], name[0].toUpperCase())
        });

        let enemytype = recv.types.map( p => {
          let name = p.type.name
          return name.replace(name[0], name[0].toUpperCase())
        });

        // // capitalize first char
        // this.setTypes(
        //   dittotype.replace(dittotype[0], dittotype[0].toUpperCase()),
        //   enemytype.replace(enemytype[0], enemytype[0].toUpperCase())
        // );

        this.setTypes(dittotype, enemytype)

      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState(useMainStore, [
      "inventory",
      "money",
      "rounds",
      "ditto",
      "enemy",
      "enemies",
      "getMaxHp",
      "itemlog",
      "runlog",
      "runStatus",
      "loots",
    ]),

    showNextStop() {
      if (this.counter === 3) {
        // swap next stop
        this.nextStop = this.nextStop === "center" ? "shop" : "center";
        this.counter = 0;
        return this.nextStop;
      }
      return false;
    },

    notDupe(){
      const idx = this.ditto.transforms.findIndex( p => p.id === this.enemy.id)
      this.skip = idx<1
      return this.skip
    },

    isShiny() {
      return Math.random() < this.shinyRates;
    },

    currentDittoHP(){
      return Math.ceil(this.ditto.hp * this.getMaxHp * 0.01)
    },
  },
  created() {
    // if (this.$route.query.continue) {
    //   // fetch progress if continue
    //   console.log("continue");
    // } else {
    // sniped to new game
    this.dittoimg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"
    this.enemyimg = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png"
    if(this.runStatus==='finish'){
      this.nextStop = ""
      this.counter = 0;
      this.newgamehandler();
    }
    this.skip=true
    // }
  },

  watch: {
    runStatus(newval, oldval) {
      if (newval === "combat") {
        this.fetchsrpiteimgNType();
      }
      if (newval === "finish" && !oldval) {
        this.fetchsrpiteimgNType();
      }
    },

    rounds(newval, oldval) {
      if (newval === 0) {
        this.counter = 0;
      } else if (newval > oldval) {
        this.counter++;
      }
    },
  },
};
</script>

<template>
  <div class="battle-container">
    <!-- =========== -->
    <!-- left column -->
    <!-- =========== -->
    <div class="left-battle-panel">
    <!-- Starter -->
    <div class="battle-map-area-container" v-if="!enemy && runStatus === 'start'" >
      <h1>SELECT ENEMY TO FIGHT</h1>
      <div class="battle-map-select-container" v-if="enemies.length>0" >
        <StarterCard class="map-selector-card selected-yellow"
          v-for="pokemon in enemies" :pokemon="pokemon" :key="pokemon.id" @click="enemySelected(pokemon)" />
        <!-- bonus stage -->
        <div class="map-selector-card" v-if="showNextStop">
          <span class="span-headers invent-item-title">{{showNextStop.toUpperCase()}}</span>
          <div class="map-image-container">
            <img src="https://pokemongohub.net/wp-content/uploads/2019/12/jvy42zwoit741.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
    <!-- transform -->
    <div class="battle-map-area-container" v-if="ditto.active < 1 && enemy && runStatus === 'start'">
      <h1>SELECT YOUR TRANSFORMATION</h1>
      <div class="battle-map-select-container">
        <StarterCard class="map-selector-card selected-purple" @click="initFight(i)"
          v-for="(pokemon, i) in ditto.transforms.slice(1)" :key="pokemon.id"
          :pokemon="pokemon"/>
      </div>
    </div>
    <div v-else></div>
    <!-- ====== -->
    <!-- combat -->
    <!-- ====== -->
    <div class="battle-combat-container" v-if="runStatus === 'combat' && ditto.active > 0" >
      <div class="battle-sprite">
        <div class="panel-my-pokemon">
          <div class="battle-sprite-ditto">
            <img :src="dittoimg" alt="" />
          </div>
        </div>
        <div class="panel-enemy-pokemon">
          <div class="battle-sprite-enemy">
            <img :src="enemyimg" alt="" />
          <HPBar :currentHP="enemy.currenthp" :maxHP="enemy.maxhp" />
          </div>
        </div>
      </div>
      <div class="battle-move-set">
        <MoveCard v-for="move in ditto.transforms[ditto.active].moves" :move="move" />
      </div>
    </div>
    <div v-else></div>
    <!-- ============== -->
    <!-- run status end -->
    <!-- ============== -->
    <!-- replace transform -->    
    <div class="battle-map-area-container" v-if="runStatus === 'end'">
      <div v-show="notDupe">
        <h1>SELECT TRANSFORMATION TO DISCARD</h1>
        <div class="battle-map-select-container">
          <StarterCard class="map-selector-card selected-red" @click="discardTransform(i+1)"
            v-for="(pokemon, i) in ditto.transforms.slice(1)" :key="pokemon.id"
            :pokemon="pokemon"/>
          <StarterCard class="map-selector-card selected-red" @click="discardTransform(0)"          
            :pokemon="enemy"/>
        </div>
      </div>
      <div class="battle-map-area-container" v-show="!notDupe" @click="discardTransform(0)">
        <h1>CLICK HERE TO CONTINUE</h1>
      </div>
      <div class="stat-container" v-if="rounds > 0" v-show="runStatus === 'end'" @click="discardTransform(0)">
        <div v-for="loot in loots" class="detail-container">
          <span class="stat-detail">{{ loot }}</span>
        </div>
      </div>
    </div>


    <!-- show round log -->
    <!-- <div class="battle-info-container" v-if="rounds > 0" v-show="runStatus === 'end'"> -->
    <!-- </div> -->
    </div>
    <!-- ============ -->
    <!-- right column -->
    <!-- ============ -->
    <div class="battle-info-container" v-if="rounds > 0">
      <!-- poke info -->
      <div class="info-panel" >
        <div class="info-my-pokemon">
          <div class="icon-sprite">
            <img src="https://play.pokemonshowdown.com/sprites/ani/ditto.gif" alt="" />
          </div>
          <div class="healt-bar">
            <HPBar :currentHP="currentDittoHP" :maxHP="getMaxHp" />
            <!-- <div class="health-box">
              <div class="current-health" :style="{ width: `${ditto.hp}%` }" ></div>
              <div class="loss-health" :style="{ width: `${100 - ditto.hp}%` }" ></div>
            </div> -->
            <div class="healt-label">
              <span class="text-health">Lvl: {{ ditto.level }}</span>
              <span class="text-health">HP: {{ Math.ceil(ditto.hp * getMaxHp * 0.01) }}/{{ getMaxHp }}</span>
            </div>
          </div>
        </div>
        <div class="invent-item-title">
          <span class="span-headers">Round: {{ rounds }} </span>
          <span class="span-headers">Money: {{ money }} </span>
        </div>
        <div class="info-inventory">
          <!--  -->
          <div class="info-invent-container" v-for="(cat, key) in inventory" 
          v-show="Object.keys(cat).length > 0">
            <div class="invent-item-title">
              <span class="span-headers">{{key}}</span>
            </div>
            <table class="invent-item-container" >
              <tr class="invent-item-row" 
              v-for="(item, name) in cat" 
              v-show="item.stock > 0" @click="useInventItem(key, name)" 
              :key="name" >
                <td class="invent-item-name">
                  <span class="span-headers invent-item-detail">{{name}}</span>
                </td>
                <td class="invent-item-val">
                  <span class="span-headers invent-item-detail">{{item.stock}}</span>
                </td>
              </tr>
            </table>
          </div>
          <!--  -->
          <!-- <div class="info-invent-container" v-show="inventory.Medicine.length">
            <div class="invent-item-title">
              <span class="span-headers">Consumables</span>
            </div>
            <table class="invent-item-container">
              <tr class="invent-item-row" v-show="invent.stock > 0" @click="useInventItem(invent, index)" 
              v-for="(invent, index) in inventory.Medicine" :key="invent.id" >
                <td class="invent-item-name">
                  <span class="span-headers invent-item-detail">{{invent.name}}</span>
                </td>
                <td class="invent-item-val">
                  <span class="span-headers invent-item-detail">{{invent.stock}}</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="info-invent-container" v-show="inventory.Utils.length">
            <div class="invent-item-title">
              <span class="span-headers">Utilities</span>
            </div>
            <table class="invent-item-container">
              <tr class="invent-item-row" v-show="invent.stock > 0" @click="useInventItem(invent, index)" 
              v-for="(invent, index) in inventory.Utils" :key="invent.id" >
                <td class="invent-item-name">
                  <span class="span-headers invent-item-detail">{{invent.name}}</span>
                </td>
                <td class="invent-item-val">
                  <span class="span-headers invent-item-detail">{{invent.stock}}</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="info-invent-container" v-show="inventory.Berries.length">
            <div class="span-headers invent-item-title">
              <span class="span-headers">Berries</span>
            </div>
            <table class="invent-item-container">
              <tr class="invent-item-row" v-show="invent.stock > 0" @click="useInventItem(invent, index)" 
                v-for="(invent, index) in inventory.Berries" :key="invent.id" >
                <td class="invent-item-name">
                  <span class="span-headers invent-item-detail">{{invent.name}}</span>
                </td>
                <td class="invent-item-val">
                  <span class="span-headers invent-item-detail">{{invent.stock}}</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="info-invent-container" v-show="inventory.Valuable.length">
            <div class="invent-item-title">
              <span class="span-headers">Valuable</span>
            </div>
            <table class="invent-item-container">
              <tr class="invent-item-row" v-show="invent.stock > 0" 
                v-for="(invent, index) in inventory.Valuable" :key="invent.id" >
                <td class="invent-item-name">
                  <span class="invent-item-detail">{{ invent.name }}</span>
                </td>
                <td class="invent-item-val">
                  <span class="invent-item-detail">{{ invent.stock }}</span>
                </td>
              </tr>
            </table>
          </div> -->
          <div class="info-invent-container">
            <div class="invent-item-title" v-show="itemlog.length">
              <span class="span-headers">{{ itemlog }}</span>
            </div>
          </div>
          <div class="info-invent-container">
            <!-- <div class="invent-item-title" v-show="runlog.length">
              <div class="show-log-list">
                <span class="log-detail" v-for="log in runlog[runlog.length - 1]" > {{ log }} </span>
              </div>
            </div> -->
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
  cursor: default;
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
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.battle-map-area-container h1 {
  -webkit-text-stroke: 1px #3556a2;
  -webkit-text-fill-color: yellow;
  text-shadow: 3px 3px 0 #3556a2, -1px -1px 0 #3556a2, 1px -1px 0 #3556a2,
    -1px 1px 0 #3556a2, 1px 1px 0 #3556a2;
  color: yellow;
  font-weight: bold;
  text-align: center;
}

.battle-info-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  min-width: 200px;
  min-height: 400px;
  height: 100%;
  width: 33%;
  background-color: #424242;
}

.info-panel{
  width: 100%;
}

.battle-sprite {
  min-width: 400px;
  min-height: 300px;
  height: 80%;
  width: 80%;
  /* border: #3e304a 10px solid;
  box-shadow: 0 0 0 10px #bf3d3b; */
  display: flex;
  justify-content: space-around;
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

.panel-my-pokemon{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.panel-enemy-pokemon{
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.battle-sprite-enemy {
  width: 50%;
  height: 50%;
  max-width: 400px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.battle-sprite-enemy img {
  width: 80%;
  height: 80%;
  object-fit: cover;
}

.battle-sprite-ditto {
  width: 50%;
  height: 50%;
  max-width: 400px;
  max-height: 400px;
}

.battle-sprite-ditto img {
  width: 80%;
  height: 80%;
  object-fit: cover;
}

.show-log-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.log-detail {
  padding: 0;
  font-weight: bold;
  text-align: center;
}

.span-headers {
  padding: 5%;
  font-weight: bold;
}

.selected-red:hover {
  border: red 10px double;
}

.selected-yellow:hover {
  border: yellow 10px double;
}

.selected-purple:hover {
  border: purple 10px double;
}

.left-battle-panel {  
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;  
  align-items: center;
}

</style>
