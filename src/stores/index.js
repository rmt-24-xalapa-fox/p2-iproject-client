import { defineStore } from "pinia";
import axios from 'axios'

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
    logedIn: false,
  }),
  actions: {
    getPath(path){
      const root = 'http://localhost:3000'
      return root+path
    },

    setLogin(stat){
      this.logedIn = stat
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
