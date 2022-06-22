import { defineStore } from "pinia";
import axios from 'axios'

export const useMainStore = defineStore({
  id: "main",
  state: () => ({    
    pokedex: [], // id/tag of pokemon encounter
    inventory: {
      Medicine: [],
      Berries: [],
      Valuable: [],
      Utils: [],
    }, 
    items: [],
    ditto: {
      hp:100,
      level:5,
      transforms: [{
        id: 132,
        hp: 134,
        attack: 91,
        defense: 91,
        type: "Normal",
        moves: [],
      }], // array of ofject pokemon, { id, name, hp, attack, deff, type, moves:[{id, name, type, power}] }   
      active: 0,
    },
    money: 0,
    enemy: {},
    enemies: [],
    maps: [],
    rounds: 0,
    logedIn: false,
    newrun: true,
    itemlog: '',
  }),
  getters: {
    getMaxHp(){
      const hp = (this.ditto.transforms[this.ditto.active].hp + 15) * (0.02*this.ditto.level)
      return Math.ceil(hp)
    },

    getAtk(){
      const atk = (this.ditto.transforms[this.ditto.active].attack + 15) * (0.02*this.ditto.level)
      return Math.ceil(atk)
    },

    getDeff(){
      const def = (this.ditto.transforms[this.ditto.active].defense + 15) * (0.02*this.ditto.level)
      return Math.ceil(def)
    },
  },

  actions: {
    getPath(path){
      const root = 'http://localhost:3000'
      return root+path
    },

    setLogin(stat){
      this.logedIn = stat
    },

    combatRound(pokemon){      
      this.rounds++
      this.enemy=pokemon
      // console.log(this.rounds);
    },

    transforms(i){
      this.ditto.active = i+1
      // console.log(this.ditto.transforms[this.ditto.active].moves);
    },

    dmgEnemy(){
      
    },

    useInventItem(invent, idx){
      if(invent.type==="Berries" || invent.type==="Medicine"){
        if(this.ditto.hp===100){
          this.itemlog = "Already full HP!";
          return
        }
        // current hp
        let hp = ( this.ditto.hp * this.getMaxHp * 0.01 )
        // heal        
        if(this.inventory[invent.type][idx].heal.includes("%")){
          this.ditto.hp += Number(this.inventory[invent.type][idx].heal.replace('%'))          
        } else {          
          this.ditto.hp = hp + Number(this.inventory[invent.type][idx].heal)
        }
        if(this.ditto.hp > 100 ) this.ditto.hp = 100
        this.itemlog = `[ ${this.inventory[invent.type][idx].name} ] Used! Restored ${this.inventory[invent.type][idx].heal} HP!`
        this.inventory[invent.type][idx].stock--
      }

      if(invent.type==="Utils"){
        this.itemlog = `[ ${this.inventory.Utils[idx].name} ] Used!`
        this.inventory.Utils[idx].stock--
      }
      
    },

    async LoginHandler(data){
      try {        
        const { data: recv } = await axios.post(this.getPath("/login"), {}, {
          headers: { credential: data.credential },
        });

        // console.log("datarecv",recv);

        if (recv) {          
          localStorage.setItem("access_token", recv.access_token);
          this.isLogin = true;
        }

        this.logedIn = true
      } catch (error) {
        console.log(error);
      }
    },

    async saveRun(){
      try {
        const access_token = localStorage.getItem('access_token')
        if(!access_token) return

        const data = {
          newrun:this.newrun,
          rounds:this.rounds,
          hp:this.ditto.hp,
          level:this.ditto.level,
          money:this.money,
          transforms:JSON.stringify(this.transforms),          
          map:JSON.stringify(this.maps),
          inventory:this.inventory,
        }

        await axios.post(this.getPath("/run/save"), data, {
          headers: { access_token }
        });

      } catch (error) {
        console.log(error);
      }
    },

    async newgamehandler(){
      try {
        const { data: recv } = await axios.get(this.getPath("/battle"));

        // console.log("STARTER", recv);

        this.ditto.transforms = recv.pokemons        
        this.enemies = recv.pokemons.slice(1)

        // console.log("ITEMS", recv);
        this.items = recv.items
        
        // starting items
        const potion = recv.items.find(i => i.name==='Potion')
        potion.stock = 5
        const rope = recv.items.find(i => i.name==='Escape Rope')
        rope.stock = 1
        this.inventory.Medicine = [potion]
        this.inventory.Utils = [rope]

        // char reset
        this.ditto.hp = 50
        this.ditto.level = 50

      } catch (error) {
        console.log(error);
      }
    },

    getMaps(){
      // random map to select
      // include rounds for bonus map

      // go legendary when round meets
    },

    getEnemies(){

    },

    getPokemons(){

    },

    getPokemonById(id){

    },

    initState(){
      // check if login or not
      // if login get from db for state
      // if no login check local storage again for "saved"
    },

    async fetchItemsList(){
      try {
        
      } catch (error) {
        console.log(error);
      }
    }

  },

});
