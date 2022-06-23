import { defineStore } from "pinia";
import axios from 'axios'

export const useMainStore = defineStore({
  id: "main",
  state: () => ({    
    pokedex: [], // id/tag of pokemon encounter
    inventory: {
      Medicine: {},
      Berries: {},
      Valuable: {},
      Utils: {},
    }, 
    items: {},
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
    enemy: false,
    enemies: [],
    maps: [],
    rounds: 0,
    runends: false,
    logedIn: false,
    newrun: true,
    itemlog: '',
    typematchup: {},
    runlog: [],
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

    enemySelected(pokemon){
      this.enemy=pokemon
      // console.log(this.rounds);
    },

    transforms(i){
      this.rounds++
      this.ditto.active = i+1
      // console.log(this.ditto.transforms[this.ditto.active].moves);
    },

    calcDmg(move, levelatk, attacker, leveldef, defender){      
      // dmg = (0.5 * power * (atk/deff) * mod) + 1
      const reduc = (((attacker.attack+15) * levelatk) / ((defender.defense+15) * leveldef) )
      const mod = this.typematchup[move.type][defender.type]
      const dmg = Math.floor( 0.5 * move.power * reduc * mod ) + 1
      return dmg

    },

    dmgEnemy(move){
      // attack enemy
      let enemylvl
      if(this.rounds<21){
        enemylvl = ((this.rounds-1)*2)+5
      }
      else {
        enemylvl = this.rounds+25 < 100 ? this.rounds+25 : 100
      }

      this.runlog.push(`Use move [ ${move.name} ]`)

      const dmg1 = this.calcDmg(move, 
        this.ditto.level, this.ditto.transforms[this.ditto.active], 
        enemylvl, this.enemy
      )
      // check enemy hp
      if(!this.enemy.currenthp){
        this.enemy.currenthp = (this.enemy.hp + 15) * (0.02*(enemylvl))
      }

      this.enemy.currenthp -= dmg1

      if(this.enemy.currenthp<0){
        this.runlog.push(`Enemy [ ${this.enemy.name} ] has fainted`)

        this.enemy = false

        if(this.rounds<21){
          this.ditto.level += 2
        } else if (this.ditto.level<100) {
          this.ditto.level++
        }

        // chance loot
        const rng = Math.random()
        let loot

        if(rng < 0.01) {
          // rare candy
          if(!this.inventory.Utils["Rare Candy"]){
            this.inventory.Utils["Rare Candy"] = { stock: 0 }
          }
          this.inventory.Utils["Rare Candy"].stock++
          this.runlog.push(`Obtained [ Rare Candy ]`)
        } else if (rng < 0.25 ) {
          // valuable
          // check what valuable to get
          loot = 'Valuable'
        } else if (rng < 0.45 ) {
          // berry
          loot = 'Berries'
        } else if (rng < 0.5) {
          // pot
          loot = 'Medicine'
        }

        if(loot){
          console.log("THIS ITEMS", this.items);
          const val = Math.floor(Math.random() * this.items[loot].length)
          if(!this.inventory[loot][this.items[loot][val].name]){
            this.inventory[loot][this.items[loot][val].name] = { stock: 0 }
          }
          this.inventory[loot][this.items[loot][val].name].stock++
          this.runlog.push(`Obtained [ ${this.inventory[loot][this.items[loot][val].name]} ] `)
        }

        // incr money
        this.money += this.rounds < 20 ? 200 : 150
        this.runlog.push(`Obtained money + ${ this.rounds < 20 ? 200 : 150 } `)

        return
      }
      // enemy attack

      let enemymove = Math.random() < 0.37 ? this.enemy.moves[0] : this.enemy.moves[1]

      const dmg2 = this.calcDmg(enemymove, 
        enemylvl, this.enemy,
        this.ditto.level, this.ditto.transforms[this.ditto.active]
      )

      this.runlog.push(`Enemy use move [ ${enemymove.name} ]`)

      // cehck hp
      this.ditto.hp = (( this.ditto.hp * this.getMaxHp * 0.01 ) - dmg2) * 100 / this.getMaxHp

      if(this.ditto.hp<0){
        // end run        
        this.saveRun()
        this.runends = true
        this.runlog.push(`You Pokemon has fainted! Runs end!`)
      }

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
        this.runlog.push("[ ${this.inventory[invent.type][idx].name} ] Used! Restored ${this.inventory[invent.type][idx].heal} HP!")
        this.inventory[invent.type][idx].stock--
      }

      if(invent.type==="Utils"){
        if(invent.name==='Rare Candy'){
          this.ditto.level++
        }

        if(this.name==='Escape Rope'){
          this.rounds++
        }

        this.itemlog = `[ ${this.inventory.Utils[idx].name} ] Used!`
        this.runlog.push(`[ ${this.inventory.Utils[idx].name} ] Used!`)
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
      const access_token = localStorage.getItem('access_token')
      if(!access_token) return
      try {
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
        this.initState()

        const { data: recv } = await axios.get(this.getPath("/battle"));

        // console.log("STARTER", recv);

        this.ditto.transforms = recv.pokemons        
        this.enemies = recv.pokemons.slice(1)

        // console.log("ITEMS", recv);
        const itemstemp = {}
        recv.items.forEach( item => {
          if(!itemstemp[item.type]) {
            itemstemp[item.type] = [item]
          }
          else {
            itemstemp[item.type].push(item)
          }
        });
        this.items = itemstemp
        
        // starting items
        const potion = recv.items.find(i => i.name==='Potion')
        potion.stock = 5
        const rope = recv.items.find(i => i.name==='Escape Rope')
        rope.stock = 1
        this.inventory.Medicine = [potion]
        this.inventory.Utils = [rope]

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

    setTypes(p1, p2){
      this.ditto.transforms[this.ditto.active].type = p1
      this.enemy.type = p2
    },

    initState(){
      // check if login or not
      // if login get from db for state
      // if no login check local storage again for "saved"
      // char reset
      this.ditto.hp = 100
      this.ditto.level = 5
      this.money = 1200
      this.runends = false
      this.newrun = true,
      this.itemlog = '',
      
      this.gettypematchup()
      
    },

    async gettypematchup(){
      try {
        const options = {
          method: 'GET',
          url: 'https://pokemon-go1.p.rapidapi.com/type_effectiveness.json',
          headers: {
            'X-RapidAPI-Key': '3324562bf3msh5e00b52221ecad6p149f0cjsn5a09fb4f9622',
            'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
          }
        };
        const recv = await axios.request(options)
        this.typematchup = recv.data        
      } catch (error) {
        console.log(error);
      }
    },

    // async fetchItemsList(){
    //   try {
        
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

  },
});
