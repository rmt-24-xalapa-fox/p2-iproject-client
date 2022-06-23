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
    runStatus: false, // start (select enemy/transform) -> combat -> end (replace transform) -> finish
    itemlog: '',
    typematchup: {},
    runlog: [],
    roundlog: [],
    loots: [],
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

    getEnemyLvl(){
      let enemylvl
      if(this.rounds<21){
        enemylvl = ((this.rounds-1)*2)+5
      }
      else {
        enemylvl = this.rounds+25 < 100 ? this.rounds+25 : 100
      }
      return enemylvl
    },
  },

  actions: {
    getPath(path){
      const root = 'http://localhost:3000'
      // const root = 'https://pokemon-ditto-roguelike.herokuapp.com'
      return root+path
    },

    setLogin(stat){
      this.logedIn = stat
    },

    enemySelected(pokemon){
      this.enemy=pokemon
      // console.log(this.rounds);
    },

    initFight(i){
      if (this.rounds>0) {
        this.runlog.push(this.roundlog)
        this.roundlog = []
      }

      this.rounds++
      this.ditto.active = i+1
      this.roundlog.push(`[ Ditto ] transform into [ ${this.ditto.transforms[i+1].name} ]`)
      console.log(`[ Ditto ] transform into [ ${this.ditto.transforms[i+1].name} ]`);
      this.runStatus = 'combat'
      // console.log(this.ditto.transforms[this.ditto.active].moves);
    },

    discardTransform(i){
      if(i>0){
        // replace ditto

        this.roundlog.push(`[ ${this.ditto.transforms[i+1].name} ] has been replaced with [ ${this.enemy.name} ]`)
        console.log(`[ ${this.ditto.transforms[i+1].name} ] has been replaced with [ ${this.enemy.name} ]`);
        
        this.ditto.transforms.splice(i+1, 1, this.enemy);
      }

      this.enemy = false
      this.loots = []
      this.runStatus = 'start'
    },

    calcDmg(move, levelatk, attacker, leveldef, defender){      
      // dmg = (0.5 * power * (atk/deff) * mod) + 1
      console.log("ATK atccker", attacker.attack , levelatk);
      console.log("DEF defender", defender.defense , leveldef);
      const reduc = (((attacker.attack+15) * levelatk) / ((defender.defense+15) * leveldef) )
      console.log("REDUCTION",reduc);
      const mod = this.typematchup[move.type][defender.type]
      console.log("MOD", move.type, defender.type, mod);
      if(mod>1){
        this.roundlog.push(`It's super effective!`)
      } 
      if(mod<1){
        this.roundlog.push(`It's not very effective...`)
      }
      const dmg = Math.floor( 0.5 * move.power * reduc * mod ) + 1
      console.log("YEP DMG", dmg);
      return dmg
    },

    dmgEnemy(move){
      // attack enemy
      let enemylvl = this.getEnemyLvl

      // this.runlog.push(`Use move [ ${move.name} ]`)
      this.roundlog.push(`Use move [ ${move.name} ]`)
      console.log(`Use move [ ${move.name} ]`);

      const dmg1 = this.calcDmg(move, 
        this.ditto.level, this.ditto.transforms[this.ditto.active], 
        enemylvl, this.enemy
      )
      // check enemy hp
      console.log("HP BEFORE", this.enemy.currenthp);
      this.enemy.currenthp -= dmg1
      console.log("HP AFTER", this.enemy.currenthp);

      setTimeout(() => {}, 1000);

      if(this.enemy.currenthp<0){
        // this.runlog.push(`Enemy [ ${this.enemy.name} ] has fainted`)
        this.roundlog.push(`Enemy [ ${this.enemy.name} ] has fainted`)

        if(this.rounds<21){
          this.ditto.level += 2
          this.loots.push(`Ditto grew to level ${this.ditto.level}!`)
        } else if (this.ditto.level<100) {
          this.ditto.level++
          this.loots.push(`Ditto grew to level ${this.ditto.level}!`)
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
          // this.runlog.push(`Obtained [ Rare Candy ]`)
          this.roundlog.push(`Obtained [ Rare Candy ]`)
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

        if(this.items[loot]){
          const val = Math.floor(Math.random() * this.items[loot].length)
          if(!this.inventory[loot][this.items[loot][val].name]){
            this.inventory[loot][this.items[loot][val].name] = { stock: 0 }
          }
          this.inventory[loot][this.items[loot][val].name].stock++
          // this.runlog.push(`Obtained [ ${this.inventory[loot][this.items[loot][val].name]} ] `)
          this.roundlog.push(`Obtained [ ${this.items[loot][val].name} ] `)
          this.loots.push(`Obtained [ ${this.items[loot][val].name} ] `)
        }

        // incr money
        this.money += this.rounds < 20 ? 200 : 150
        // this.runlog.push(`Obtained money + ${ this.rounds < 20 ? 200 : 150 } `)
        this.roundlog.push(`Obtained money +${ this.rounds < 20 ? 200 : 150 } `)
        this.loots.push(`Obtained money +${ this.rounds < 20 ? 200 : 150 } `)

        // this.runlog.push(this.roundlog)
        // this.roundlog = []
        // this.rounds++
        this.ditto.active = 0
        this.enemies = []
        // this.enemy = false
        this.runStatus = 'end'
        this.getPokemons()
        // get new pokemon enemy
        return
      }
      // enemy attack

      let enemymove = Math.random() < 0.37 ? this.enemy.moves[0] : this.enemy.moves[1]

      const dmg2 = this.calcDmg(enemymove, 
        enemylvl, this.enemy,
        this.ditto.level, this.ditto.transforms[this.ditto.active]
      )

      // this.runlog.push(`Enemy use move [ ${enemymove.name} ]`)
      this.roundlog.push(`Enemy use move [ ${enemymove.name} ]`)
      console.log(`Enemy use move [ ${enemymove.name} ]`);

      // cehck hp
      this.ditto.hp = (( this.ditto.hp * this.getMaxHp * 0.01 ) - dmg2) * 100 / this.getMaxHp

      if(this.ditto.hp<0){
        // end run        
        this.saveRun()
        this.runStatus = 'finish'
        // this.runlog.push(`Your Pokemon has fainted! Runs end!`)
        this.roundlog.push(`Your Pokemon has fainted! Runs end!`)

        this.runlog.push(this.roundlog)
        this.roundlog = []

        this.router.push({ name: "statistic" })
      }

    },

    useInventItem(invent, idx){
      if(invent.type==="Berries" || invent.type==="Medicine"){
        if(this.ditto.hp===100){
          this.itemlog = "Already full HP!";
          return
        }
        // current hp
        let currenthp = ( this.ditto.hp * this.getMaxHp * 0.01 )
        let hpafter = this.ditto.hp
        // heal        
        if(this.inventory[invent.type][idx].heal.includes("%")){
          hpafter += Number(this.inventory[invent.type][idx].heal.replace('%',''))
        } else {          
          hpafter = currenthp + Number(this.inventory[invent.type][idx].heal)
        }
        if(hpafter > 100 ){
          this.ditto.hp = 100
        } else {
          this.ditto.hp = hpafter
        }
        this.itemlog = `[ ${this.inventory[invent.type][idx].name} ] Used! Restored ${this.inventory[invent.type][idx].heal} HP!`
        // this.runlog.push(`[ ${this.inventory[invent.type][idx].name} ] Used! Restored ${this.inventory[invent.type][idx].heal} HP!`)
        this.roundlog.push(`[ ${this.inventory[invent.type][idx].name} ] Used! Restored ${this.inventory[invent.type][idx].heal} HP!`)
        this.inventory[invent.type][idx].stock--
        
        console.log(`[ ${this.inventory[invent.type][idx].name} ] Used! Restored ${this.inventory[invent.type][idx].heal} HP!`);
      }

      if(invent.type==="Utils"){
        if(invent.name==='Rare Candy'){
          if(this.runStatus==='end'){
            this.ditto.level++
            this.itemlog = `[ ${this.inventory.Utils[idx].name} ] Used!`
            this.roundlog.push(`[ ${this.inventory.Utils[idx].name} ] Used!`)
            this.inventory.Utils[idx].stock--

            console.log(`[ ${this.inventory.Utils[idx].name} ] Used!`)
          }
          else {
            this.itemlog = `[ ${this.inventory.Utils[idx].name} ] Cannot be used now!`
          }
        }

        if(invent.name==='Escape Rope'){
          if(this.runStatus!=='combat'){
            this.itemlog = `[ Escape Rope ] Cannot be used now!`
            return
          }
          this.rounds++
          this.ditto.active = 0
          this.enemy = false
          this.pokemons = []
          this.getPokemons()
          this.runStatus = 'end'
          this.loots = []
          this.itemlog = `[ ${this.inventory.Utils[idx].name} ] Used!`
          this.roundlog.push(`[ ${this.inventory.Utils[idx].name} ] Used!`)
          this.inventory.Utils[idx].stock--
        }

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

        // router push here
        this.router.push({ name: 'battle'})

        // fetch starter
        const { data: recv } = await axios.get(this.getPath("/battle"));

        // console.log("STARTER", recv);

        // set ditto transform
        this.ditto.transforms = recv.pokemons
        // set enemies  
        this.enemies = recv.pokemons.slice(1)

        //set item list
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

    async getMaps(){
      try {
        const {data:enemymaps} = await axios.get(this.getPath('/battle/map'))
        this.maps = enemymaps
      } catch (error) {
        console.log(error);
      }
    },

    getEnemies(){

    },

    async getPokemons(){
      try {        
        const nextenemies = this.maps[this.rounds]

        if(!nextenemies){
          // full randomize
        }

        const { data: recv } = await axios({
          method: 'post',
          url: this.getPath('/battle/next'),
          data: {
            map: nextenemies
          }
        });

        // const { data: recv } = await axios.get( 
        //   this.getPath('/battle/next'), 
        //   { map: nextenemies }
        // )

        // const recv = await axios.get('http://localhost:3000/battle/next', { prop:'46512352154' } )

        // console.log(recv);
        this.enemies = recv
      } catch (error) {
        console.log(error);
      }
    },

    getPokemonById(id){

    },

    setTypes(p1, p2){
      this.ditto.transforms[this.ditto.active].type = p1
      this.enemy.type = p2
      this.enemy.currenthp = (this.enemy.hp + 15) * (0.02*(this.getEnemyLvl))      
      this.enemy.maxhp = (this.enemy.hp + 15) * (0.02*(this.getEnemyLvl))
    },

    initState(){
      // check if login or not
      // if login get from db for state
      // if no login check local storage again for "saved"
      // char reset
      this.ditto.hp = 100
      this.ditto.active = 0
      this.ditto.level = 5
      this.money = 1200
      this.itemlog = ''
      this.rounds = 0
      this.runStatus = 'start'
      this.enemy = false
      this.enemies = []
      this.runlog = [],
      this.roundlog = []
      this.loots = [],
      
      this.gettypematchup()
      this.getMaps()
      
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
