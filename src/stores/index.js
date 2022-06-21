import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    transforms: [], // array of ofject pokemon, { id, name, level, hp, attack, deff, type, moves:[{id, name, type, power}] }
    pokedex: [], // id/tag of pokemon encounter
    tm: [], // array of object, 
    inventory: {
      Medicine: [],
      Berries: [],
      TM: [],
    }, 
    money: 0,
    enemies: [],
    rounds: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
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



  },

});
