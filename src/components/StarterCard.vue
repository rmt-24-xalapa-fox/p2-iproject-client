<template>
<div class="map-selector-card">
  <span class="invent-item-title">{{pokemon.name}}</span>
  <div class="map-image-container">
    <img
      :src="sprite"
      alt=""
    />
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: "StarterCard",
  data(){
    return {            
      sprite: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png"
    }
  },
  props: ["pokemon"],
  computed: {
    isShiny(){
      return (Math.random()<this.shinyRates)
    }
  },
  methods: {
    async fetchsrpiteimg(){
      try {
        const {data:recv} = await axios.request({
          method: 'GET',
          url: 'https://pokeapi.co/api/v2/pokemon/'+this.pokemon.id
        })
        // console.log(recv.sprites);        
        if(this.isShiny){
          this.sprite = recv.sprites.front_shiny
        } else {
          this.sprite = recv.sprites.front_default
        }

      } catch (error) {
        console.log(error);
      }
    },
  },
  created(){
    // fetch img
    this.fetchsrpiteimg()
  }
}
</script>
