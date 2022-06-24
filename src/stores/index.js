import { defineStore } from "pinia";
import axios from 'axios'

export const useMainStore = defineStore({
  id: "main",
  state: () => ({    
    pokedex: [], // id/tag of pokemon encounter
    inventory: {
      Medicine: {},
      Berry: {},
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
    runStatus: 'finish', // start (select enemy/transform) -> combat -> end (replace transform) -> finish
    itemlog: '',
    typematchup: {},
    runlog: [],
    roundlog: [],
    loots: [],
    bonusstage: false
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
      // const root = 'http://localhost:3000'
      const root = 'https://pokemon-ditto-roguelike.herokuapp.com'
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
        this.roundlog.push(`[ ${this.ditto.transforms[i].name} ] has been replaced with [ ${this.enemy.name} ]`)
        console.log(`[ ${this.ditto.transforms[i].name} ] has been replaced with [ ${this.enemy.name} ]`);
        
        this.ditto.transforms.splice(i, 1, this.enemy);
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
      let mod = 1
      defender.type.forEach( e => {
        mod *= this.typematchup[move.type][e]
        console.log("MOD", move.type, e, mod);
      });
      console.log("MOD Final", move.type, defender.type, mod);
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
          this.inventory[loot][this.items[loot][val].name].stock++
          // this.runlog.push(`Obtained [ ${this.inventory[loot][this.items[loot][val].name]} ] `)
          this.roundlog.push(`Obtained [ ${this.items[loot][val].name} ] `)
          this.loots.push(`Obtained [ ${this.items[loot][val].name} ] `)
        }

        // bonus from rounds
        if(this.rounds%20===0){
          this.inventory["Utils"]['Rare Candy'].stock++
        }
        else if(this.rounds%5===0){
          this.inventory["Medicine"]['Super Potion'].stock++
        }
        else if(this.rounds%3===0){          
          this.inventory["Berry"][this.items.Berry[Math.floor(Math.random()*this.items.Berry.length)].name].stock++
        }

        // incr money
        this.money += this.rounds < 20 ? 200 : 150
        // this.runlog.push(`Obtained money + ${ this.rounds < 20 ? 200 : 150 } `)
        this.roundlog.push(`Obtained ${ this.rounds < 20 ? 200 : 150 } coins.`)
        this.loots.push(`Obtained ${ this.rounds < 20 ? 200 : 150 } coins.`)

        // this.runlog.push(this.roundlog)
        // this.roundlog = []
        // this.rounds++
        this.ditto.active = 0
        this.enemies = []
        // this.enemy = false
        this.runStatus = 'end'

        // get next enemies
        if(this.rounds<20){
          this.getPokemons()
        } 
        else if(this.rounds%20===0){
          // BOSS MODE guarantee every 20 rounds
          this.getBossEnemies()
        } 
        else {
          // infinite time
          this.getRandEnemies()
        }

        // refresh every round
        this.bonusstage = true
        
        return
      }
      // enemy attack

      let enemymove = Math.random() < 0.72 ? this.enemy.moves[0] : this.enemy.moves[1]
      
      // this.runlog.push(`Enemy use move [ ${enemymove.name} ]`)
      this.roundlog.push(`Enemy use move [ ${enemymove.name} ]`)
      console.log(`Enemy use move [ ${enemymove.name} ]`);

      const dmg2 = this.calcDmg(enemymove, 
        enemylvl, this.enemy,
        this.ditto.level, this.ditto.transforms[this.ditto.active]
      )


      // cehck hp
      this.ditto.currenthp = Math.ceil( this.ditto.hp * this.getMaxHp * 0.01 )
      console.log("HP BEFORE", this.enemy.currenthp);
      this.ditto.currenthp -= dmg2
      console.log("HP AFTER", this.enemy.currenthp);

      this.ditto.hp = Math.ceil((this.ditto.currenthp) * 100 / this.getMaxHp)

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

    useInventItem(key, name){      
      const item = this.items[key].find( itm => itm.name === name )

      if(key==="Berry" || key==="Medicine"){
        if(this.ditto.hp===100){
          this.itemlog = "Already full HP!";
          return
        }

        // current hp
        let currenthp = Math.ceil( this.ditto.hp * this.getMaxHp * 0.01 )
        let hpafter = currenthp

        // console.log(item.heal, item.heal.includes("%"));

        if(item.heal.includes("%")){
          hpafter += Math.ceil(Number(item.heal.replace('%',''))*this.getMaxHp*0.01)
        } else {          
          hpafter = currenthp + Number(item.heal)
        }

        hpafter = Math.ceil( hpafter * 100 / this.getMaxHp )

        if(hpafter > 100 ){
          this.ditto.hp = 100
        } else {
          this.ditto.hp = hpafter
        }

        const heal = item.heal.includes("%") ? Math.ceil(Number(item.heal.replace('%',''))*this.getMaxHp) : item.heal

        this.itemlog = `[ ${item.name} ] Used! Restored ${item.heal} HP!`
        // this.runlog.push(`[ ${item.name} ] Used! Restored ${item.heal} HP!`)
        this.roundlog.push(`[ ${item.name} ] Used! Restored ${item.heal} HP!`)
        this.inventory[key][name].stock--
        
        console.log(`[ ${item.name} ] Used! Restored ${item.heal} HP!`);

      }

      if(name==='Rare Candy'){
        if(this.ditto.level<100){
          if(this.runStatus==='end' || this.runStatus==='start'){
            this.ditto.level++
            this.itemlog = `[ ${name} ] Used!`
            this.roundlog.push(`[ ${name} ] Used!`)
            this.inventory[key][name].stock--
  
            console.log(`[ ${name} ] Used!`)
          } else{
            his.itemlog = `[ ${name} ] Cannot be used now!`
          }
        }
        else {
          this.itemlog = `[ Ditto ] Already at max level!`
        }
      }

      if(name==='Escape Rope'){
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
        this.itemlog = `[ ${name} ] Used!`
        this.roundlog.push(`[ ${name} ] Used!`)
        this.inventory[key][idx].stock--
      }

    },

    traderHandler(){
      if( this.money >= 500){
        this.money -= 500

        const num1 = Math.random()
        let bonus

        if(num1<0.45){
          bonus = 'Valuable'
        } else if (num1<0.9) {
          bonus = 'Medicine'
        } else{
          bonus = 'Utils'
        }

        const num2 = Math.floor( Math.random() * this.items[bonus].length )
        const item = this.items[bonus][num2].name
        this.inventory[bonus][item].stock++

        this.itemlog = `You received [ ${item} ] from [ Trader Meowth ] !`
        this.roundlog.push(`You received [ ${item} ] from [ Trader Meowth ] !`)
      }
      else {
        this.itemlog = `[ Trader Meowth ] is displeased with your action and leaves!`
        this.roundlog.push(`[ Trader Meowth ] is displeased with your action and leaves!`)
      }

      this.bonusstage = false
    },

    bonfireHandler(){
      // heal
      this.ditto.hp = 100
      this.itemlog = `( Resting at Bonfire replenish your Motivation )`
      this.roundlog.push(`( Resting at Bonfire replenish your Motivation )`)
      // sell all valuables
      for (const key in this.inventory.Valuable) {
        if(this.inventory.Valuable[key].stock > 0){
          const price = this.items.Valuable.find(i => i.name===key).price
          const sell = this.inventory.Valuable[key].stock * price
          this.money += sell
          this.roundlog.push(`Burned [ ${key} ] x${this.inventory.Valuable[key].stock} and recieved ${sell} coins`)
          this.inventory.Valuable[key].stock = 0
        }
      }

      // and candy if max lvl
      if(this.ditto.level===100 && this.inventory.Utils['Rare Candy'].stock > 0){
        const price = this.items.Utils.find(i => i.name==='Rare Candy').price
        const sell = this.inventory.Utils['Rare Candy'].stock * price
        this.money += sell
        this.roundlog.push(`Burned [ Rare Candy ] x${this.inventory.Utils['Rare Candy'].stock} and recieved ${sell} coins`)
        this.inventory.Utils['Rare Candy'].stock = 0
      }

      this.bonusstage = false

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
      if(this.rounds<21) return
      try {
        // const data = {
        //   newrun:this.newrun,
        //   rounds:this.rounds,
        //   hp:this.ditto.hp,
        //   level:this.ditto.level,
        //   money:this.money,
        //   transforms:JSON.stringify(this.transforms),          
        //   map:JSON.stringify(this.maps),
        //   inventory:this.inventory,
        // }

        const data = {
          rounds:this.rounds,
          level:this.ditto.level,
          money:this.money,
          map:JSON.stringify(this.runlog)
        }

        await axios.post(this.getPath("/stats/run/save"), data, {
          headers: { access_token }
        });

      } catch (error) {
        console.log(error);
      }
    },

    contgamehandler(){
      this.router.push({ name: 'battle'})
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
        // const potion = recv.items.find(i => i.name==='Potion')
        // potion.stock = 5
        // const rope = recv.items.find(i => i.name==='Escape Rope')
        // rope.stock = 1
        this.inventory = {
          Medicine: {},
          Berry: {},
          Valuable: {},
          Utils: {},
        }

        for (const key in this.items) {
          this.items[key].forEach(itm => {
            this.inventory[key][itm.name] = { stock: 0 , img:itm.img }
          });
        }

        this.inventory.Medicine['Potion'].stock = 5
        this.inventory.Utils['Escape Rope'].stock = 1

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

    async getRandEnemies(){
      // time for all shuffle
      try {        
        const { data: recv } = await axios({
          method: 'get',
          url: this.getPath('/battle/random'),
        });

        this.enemies = recv
      } catch (error) {
        console.log(error);
      }
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

    async getBossEnemies(){
      // time for EPIC BOSS BATTLE
      try {        
        const { data: recv } = await axios({
          method: 'get',
          url: this.getPath('/battle/boss'),
        });

        this.enemies = recv
      } catch (error) {
        console.log(error);
      }
    },

    setTypes(p1, p2){
      this.ditto.transforms[this.ditto.active].type = p1
      this.enemy.type = p2
      this.enemy.currenthp = this.enemy.maxhp = Math.ceil(this.enemy.hp + 15) * (0.02*(this.getEnemyLvl))
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
      this.map = []
      
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
